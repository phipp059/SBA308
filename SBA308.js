// Provided course information, assignment group, and learner submission data
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  // Helper function to check if submission is late
  function isLate(submitted_at, due_at) {
    return new Date(submitted_at) > new Date(due_at);
  }
  
  // Helper function to check if assignment due date is in the future
  function isFutureDue(due_at) {
    return new Date(due_at) > new Date();
  }
  
  // Function to calculate learner data
  function calculateLearnerData(assignments, submissions) {
    const learners = {};
  
    submissions.forEach(submission => {
      const { learner_id, assignment_id, submission: { submitted_at, score } } = submission;
  
      // Find the corresponding assignment
      const assignment = assignments.find(a => a.id === assignment_id);
  
      // Skip future assignments
      if (isFutureDue(assignment.due_at)) {
        return;
      }
  
      // Initialize learner if not already present
      if (!learners[learner_id]) {
        learners[learner_id] = { id: learner_id, avg: 0, total_score: 0, total_possible: 0 };
      }
  
      let finalScore = score;
  
      // Deduct 10% if the submission is late
      if (isLate(submitted_at, assignment.due_at)) {
        finalScore -= assignment.points_possible * 0.1;
      }
  
      // Add the assignment score as a percentage
      learners[learner_id][assignment_id] = (finalScore / assignment.points_possible) * 100;
  
      // Update total scores for weighted average calculation
      learners[learner_id].total_score += finalScore;
      learners[learner_id].total_possible += assignment.points_possible;
    });
  
    // Calculate weighted averages for each learner
    Object.values(learners).forEach(learner => {
      learner.avg = (learner.total_score / learner.total_possible) * 100;
      delete learner.total_score;
      delete learner.total_possible;
    });
  
    return Object.values(learners);
  }
  
  const result = calculateLearnerData(AssignmentGroup.assignments, LearnerSubmissions);
  console.log(result);
  