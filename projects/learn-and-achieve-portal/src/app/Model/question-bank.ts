import { ClassMaster } from "./class-master";
import { Subject } from "./subject";

export class QuestionBank {
    questionId: string = '';
    question: string = '';
    medium: string = '';
    option1: string = '';
    option2: string = '';
    option3: string = '';
    option4: string = '';
    classMaster: ClassMaster = new ClassMaster();
    subject: Subject = new Subject();
    solution: string = '';
    answer: string = '';
    questionType: string = '';
    status: boolean = false;
}
