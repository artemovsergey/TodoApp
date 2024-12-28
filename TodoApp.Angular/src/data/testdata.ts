import { Task } from "../models/task";

export class TestData {

  static  categories = [
    // Данные для Category
    { id: 1, title: "Work" },
    { id: 2, title: "Personal" },
    { id: 3, title: "Home Improvement" },
    { id: 4, title: "Shopping" },
    { id: 5, title: "Travel" },
  ];

  static priorities = [
        // Данные для Priority
        { id: 1, title: "High", color: "#FF0000" },
        { id: 2, title: "Medium", color: "#FFFF00" },
        { id: 3, title: "Low", color: "#00FF00" },
        { id: 4, title: "Critical", color: "#FF00FF" },
        { id: 5, title: "Normal", color: "#0000FF" },
  ];

  static tasks: Task[] = [
    // Данные для Task
    {
      id: 1,
      title: "Finish project report",
      complete: false,
      category: { id: 1, title: "Work" },
      priority: { id: 1, title: "High", color: "#FF0000" },
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "Plan vacation",
      complete: true,
      category: { id: 2, title: "Personal" },
      priority: { id: 2, title: "Medium", color: "#FFFF00" },
      date: new Date('2024-03-20')
    },
    {
      id: 3,
      title: "Learn Python",
      complete: false,
      category: { id: 3, title: "Home Improvement" },
      priority: { id: 3, title: "Low", color: "#00FF00" },
      date: new Date('2024-02-01')
    },
    {
      id: 4,
      title: "Buy groceries",
      complete: true,
      category: { id: 4, title: "Shopping" },
      priority: { id: 4, title: "Critical", color: "#FF00FF" },
      date: new Date('2024-01-05')
    },
    {
      id: 5,
      title: "Exercise daily",
      complete: false,
      category: { id: 5, title: "Travel" },
      priority: { id: 5, title: "Normal", color: "#0000FF" },
      date: new Date('2024-01-01')
    }
  ]

}