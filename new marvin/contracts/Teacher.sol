pragma solidity ^0.4.2;
import "./UserData.sol";
import "./ExamData.sol";
import "./ClassData.sol";
import "./ContractManager.sol";

contract Teacher {
    address uniAddress;
    ContractManager manager;

    constructor(address _contractManagerAddress) public {
        uniAddress = msg.sender;
        manager = ContractManager(_contractManagerAddress);
    }

    // permesso solo se il chiamante è il professore associato all'esame identificato da _uniCode
    modifier onlyAuthorizedExamTeacher(bytes10 _classUniCode) {
        require(ClassData(manager.getClassContract()).getClassTeacher(_classUniCode) == UserData(manager.getUserDataContract()).getRegUsersBadgeNumber(msg.sender));
        _;
    }

    // students subscribed to the exam
    function examSubscribedStudent(bytes10 _examUniCode) public view returns(uint32[]){
        ExamData exam = ExamData(manager.getExamContract());
        return(exam.getExamSubscribedStudent(_examUniCode));
    }

    function myClasses() public view returns(bytes10[]) {
        UserData user = UserData(manager.getUserDataContract());
        ClassData class = ClassData(manager.getClassContract());
        bytes10[] memory classUniCode = class.getTeacherClasses(user.getRegUsersBadgeNumber(msg.sender));
        return(classUniCode);
    }

    function registerResult(bytes10 _examUniCode, bytes10 _classUniCode, uint32 _studentBadgeNumber, uint8 _result) public onlyAuthorizedExamTeacher(_classUniCode) {
        ExamData exam = ExamData(manager.getExamContract());
        require(exam.isExam(_examUniCode) && exam.isStudentSubscribed(_examUniCode, _studentBadgeNumber));
        exam.setNewResult(_examUniCode, _studentBadgeNumber, _result);
    }
}