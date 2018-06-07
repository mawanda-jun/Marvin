import DegreeContract from '../../../../build/contracts/DegreeData'
import { browserHistory } from 'react-router'
import store from '../../../store'

// import { web3HexToInt } from '../../../utils/validations'

import {
  readingData,
  // errorReadingData,
  dataRead,
  dataEmpty,
  // ipfsReadingData,
  // ipfsDataRead,
  // ipfsErrorReadingData,
  // ipfsNetworkError,
  eraseAdminReducerInfo,
  eraseIpfsReducerInfo
} from '../StandardDispatches/readingData'

// import ipfsPromise from '../../../../api/utils/ipfsPromise'

const contract = require('truffle-contract')

function doAwesomeStuff(dispatch, load) {
  dispatch(dataRead({ load }))
  var currentLocation = browserHistory.getCurrentLocation()
  if('redirect' in currentLocation.query) {
    //return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
    return browserHistory.replace('/profile')
  }
  return browserHistory.push('/profile/academic-years') //|| alert(payload.FC + " successfully logged in as " + utils.userDef(payload.tp) + " with badge number: " + payload.badgeNumber)
}

export function readAcademicYearsFromDatabase() {
  let web3 = store.getState()
    .web3.web3Instance

  if(typeof web3 !== 'undefined') {

    return function (dispatch) {
      // Using truffle-contract we create the authentication object.
      const degree = contract(DegreeContract)
      degree.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var degreeInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {

        dispatch(readingData())

        // Log errors, if any.
        if(error) {
          console.error(error);
        }

        degree.deployed()
          .then(function (instance) {
            degreeInstance = instance

            // Attempt to read degree courses per year
            degreeInstance.getAcademicYears({ from: coinbase })
              .then(result => {
                // console.log('result[0] : ' + web3.toHex(result[0]))

                // checking if the blockchain is empty for this kind of data.
                // when the blockchain is empty the first numbers it retrieves are:
                // 0x00000. When it's full it's 0xsomething. So we check the first number
                // after "x" to be not equal to zero.

                if(web3.toHex(result[0])
                  .toString()
                  .slice(2, 3) === '0') {
                  dispatch(dataEmpty())
                } else {
                  // console.log('result[0] : ' + web3.toHex(result[0]))

                  let i = 0
                  var payload
                  // console.error(web3HexToInt(web3.toHex(result[0])))

                  for(let years of result) {
                    // var yy = web3HexToInt(web3.toHex(years))

                    // web3 offers a 8 bit return hexadecimal number. It's not needed since
                    // solidity is returning me bytes4, so 3 bit of hexa data.
                    // I just need to slice it down to the first 3 digits and everything is ok!
                    // YOU HAVE TO CHECK THE LENGTH OF THE RETURNING BYTES AND MODIFY THE SLICE ACCORDINGLY

                    var yy = parseInt(years.slice(2, -5), 16)

                    if(i === 0) { // first element of array
                      payload = [{ year: yy + '-' + (yy + 1) }]
                      i++
                    } else
                      payload = [...payload,
                        { year: yy + "-" + (yy + 1) }
                      ]
                  }
                  //sorting results fom most recent one
                  payload.sort((a, b) => parseInt((b.year), 10) - parseInt((a.year), 10))
                  return doAwesomeStuff(dispatch, payload) //Repeating because of the asyncronous promises of the functions
                }
              })
              .catch(function (result) {
                // If error, go to signup page.
                console.error('Error while reading infos: ' + result)
                console.error('Wallet ' + coinbase + ' does not have an account!')
                dispatch(eraseAdminReducerInfo())
                dispatch(eraseIpfsReducerInfo())
                return browserHistory.push('/profile')
              })
          })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}