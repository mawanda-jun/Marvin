import { adminCostants } from '../costants'

const initialState = {
  payload: null,
  loading: null,
  justDeleted: null,
  success: null,
  empty: null
}

const academicYearsReducer = (state = initialState, action) => {
  if(action.request === adminCostants.ACADEMIC_YEARS) {
    switch(action.type) {
      // default: in this case we tried to make a dispatch without using matching any case
      default: {
        return state
      }

      // in this case the admin has dispatched an action of reading in "readAdminData.js"
      // admin is retrieving data from server, so the boolean variables work as expected
    case adminCostants.FETCHING_DATA || adminCostants.DELETING:
      {
        console.log('adminReducer: reading or deleting data from database')
        return {
          ...state,
          loading: true,
        }
        // return Object.assign({}, state, {
        //   data: action.payload,
        //   loading: true,
        //   success: null
        // })
      }

      // server finished to give data successfully, so he can unlock resources
    case adminCostants.FETCH_DATA_SUCCESS:
      {
        console.log('adminReducer: successfully fetched academic years data')
        // checking if somebody changed page during loading data, so the state.data is not overwritten by asynchronous returns
        // if(state.loading === false) return state
        return {
          ...state,
          payload: action.payload.load,
          // degreeCourses: state.degreeCourses,
          // courses: state.courses,
          success: true,
          empty: false,
          // we want to set this false so we can tell the components that they don't need to retrieve informations from blockchain but that from the store is enough
          justDeleted: false,
          loading: false
        }
      }
    case adminCostants.DELETED_DATA:
      {
        console.log('adminReducer: successfully deleted academic year')
        var newPayload = state.payload
        console.log('Trying to delete: ' + action.payload.load)
        var indexToDelete = newPayload.findIndex(index => {
          console.log('index.year: ' + index.year)
          console.log('index.year === action.payload.load: ' + (index.year === action.payload.load))
          return index.year === action.payload.load
        })
        console.log('indexToDelete: ' + indexToDelete)
        var part1 = newPayload.slice(0, indexToDelete)
        var part2 = newPayload.slice(indexToDelete + 1, -1)
        var tot = [...part1, ...part2]
        console.log('Resulting academic year payload: ' + JSON.stringify(tot))
        return {
          ...state,
          payload: tot,
          success: true,
          empty: false,
          // we want to set this false so we can tell the components that they don't need to retrieve informations from blockchain but that from the store is enough
          justDeleted: true,
          loading: false
        }
      }

      // there were some errors, so we can manage them
    case adminCostants.FETCH_DATA_ERROR || adminCostants.ERROR_DELETING_DATA:
      {
        return {
          ...state,
          loading: false,
          success: false
        }
      }
    case adminCostants.FETCH_DATA_EMPTY:
      {
        return {
          ...state,
          success: true,
          empty: true,
          loading: false
        }
      }
    case adminCostants.ERASE_ACADEMIC_YEARS:
      {
        return {
          ...state,
          payload: null,
          loading: null,
          justDeleted: null,
          success: null,
          empty: null
        }
      }
    }
  } else return state;
}
export default academicYearsReducer