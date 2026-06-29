import Quiz from "../model/Quiz.js";

const LETTERS = ['A', 'B', 'C', 'D'];

export const uploadQuiz = async (req, res) => {
  try {
    const { technology, level, timeLimit, questions } = req.body;

    console.log("BODY:", req.body);
    console.log("AUTH:", req.auth);

    const createdBy = req.auth?.userId;

    console.log("CREATED BY:", createdBy);

    const quiz = await Quiz.findOneAndUpdate(
      {
        technology: technology.toLowerCase(),
        level,
      },
      {
        technology,
        level,
        timeLimit,
        questions,
        totalQuestions: questions.length,
        createdBy,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    console.log("QUIZ SAVED:", quiz);

    res.json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error("UPLOAD QUIZ ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

//To get all the quiz stats
export const getAllQuizzes = async (req, res) => {
    const quizzes = await Quiz.find().sort({createdAt: -1});
    res.json(quizzes);
}

//Delete a perticular quiz

export const deleteQuiz = async (req,res) =>{
    try {
        const {id} = req.params;
        const quiz = await Quiz.findByIdAndDelete(id);
        if(!quiz){
            return res.status(404).json({ message: "Quiz not found"});
        }
        res.json ({ success: true, message: "Quiz deleted sucessfully! "})
    } catch (error) {
        console.error("DELETE QUIZ ERROR: ", error);
        res.status(500).json({
            message: 'Server Error'
        });
    }
}