import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { csrfFetch } from "../store/csrf";
import { createReview } from "../store/review";
import { useModal } from "../context/Modal";
// import ConfirmationModal from "./ConfirmationModal";

function ReviewModal({ spotId }) {
  const dispatch = useDispatch();
  // const loggedInUserId = useSelector((state) => state.session.user?.id);
  const { closeModal } = useModal();
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState("");
  // const [showModal, setShowModal] = useState(false);
  // const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("spotId");
        console.log(spotId);
        const [reviewsResponse] = await Promise.all([
          csrfFetch(`/api/spots/${spotId}/reviews`),
        ]);
        if (!reviewsResponse.ok) {
          throw new Error("Spot not found");
        }
        const reviewsData = await reviewsResponse.json();

        setReviews(reviewsData.Reviews || []);
      } catch (err) {
        setError(true);
      }
    };

    fetchReviews();
  }, [spotId]);

  const handleSubmit = async (e) => {
    const parsedStars = parseInt(stars, 10);
    e.preventDefault();

    if (review.length < 10) {
      setError("Comment must be at least 10 characters.");
      return;
    }

    if (!parsedStars || parsedStars < 1) {
      setError("Please select a star rating.");
      return;
    }

    try {
      const reviewData = { review, stars: parsedStars };
      await dispatch(createReview(spotId, reviewData));
      // onClose();
      closeModal();
    } catch (err) {
      setError("An error occurred while submitting your review.");
    }
  };

  // const handleDeleteClick = (reviewId) => {
  //   setReviewToDelete(reviewId);
  //   setShowModal(true);
  // };

  // const handleConfirmDelete = async () => {
  //   try {
  //     await csrfFetch(`/api/reviews/${reviewToDelete}`, { method: "DELETE" });
  //     setReviews((prevReviews) =>
  //       prevReviews.filter((review) => review.id !== reviewToDelete)
  //     );
  //     setShowModal(false); // Close the modal after deleting
  //   } catch (error) {
  //     console.error("Error deleting review:", error);
  //   }
  // };

  //   const handleDeleteReview = async (reviewId) => {
  //     // Simulate an API call
  //     try {
  //       await csrfFetch(`/api/reviews/${reviewId}`, { method: "DELETE" });

  //       // Update state to remove the deleted review
  //       setReviews((prevReviews) =>
  //         prevReviews.filter((review) => review.id !== reviewId)
  //       );
  //     } catch (error) {
  //       console.error("Error deleting review:", error);
  //     }
  //   };

  // const handleCancelDelete = () => {
  //   setShowModal(false); // Close the modal without deleting
  // };

  console.log("Stars value:", stars);

  return (
    <div className="review-modal">
      <h2>How was your stay?</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <label>
          Stars:
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
          />
        </label>
        <button
          onClick={handleSubmit}
          disabled={review.length < 10 || stars === 0}
        >
          Submit Your Review
        </button>
      </form>
      <button onClick={closeModal} className="close-modal">
        Close
      </button>

      <div className="review-management">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <p>{review.comment}</p>
            <p>Stars: {review.stars}</p>
            {/* Show the "Delete" button only for reviews posted by the logged-in user */}
            {/* {review.userId === loggedInUserId && (
              <button
                onClick={() => handleDeleteClick(review.id)}
                className="delete-review-button"
              >
                Delete
              </button>
            )} */}
          </div>
        ))}
      </div>
      {/* 
      {showModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleConfirmDelete} className="delete-button">
              Yes (Delete Review)
            </button>
            <button onClick={handleCancelDelete} className="cancel-button">
              No (Keep Review)
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default ReviewModal;
