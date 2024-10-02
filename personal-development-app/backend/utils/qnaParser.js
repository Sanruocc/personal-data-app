function parseQuestion(question, userData) {
    question = question.toLowerCase();
  
    if (question.includes('task') || question.includes('todo')) {
      const tasks = userData.tasks.filter(task => !task.completed);
      return `You have ${tasks.length} tasks to complete.`;
    }
  
    if (question.includes('goal')) {
      return `You have ${userData.goals.length} goals set.`;
    }
  
    if (question.includes('note')) {
      return `You have ${userData.notes.length} notes saved.`;
    }
  
    if (question.includes('friend') || question.includes('contact')) {
      return `You have ${userData.social.length} contacts in your network.`;
    }
  
    if (question.includes('transaction') || question.includes('spend')) {
      const total = userData.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      return `Your total spending is $${total.toFixed(2)}.`;
    }
  
    return "I'm sorry, I don't have enough information to answer that question.";
  }
  
  module.exports = { parseQuestion };