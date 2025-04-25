import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { databases, Query } from '../utils/appwrite';
import conf from '../utils/conf';
import { ID } from 'appwrite';
import user from '../assets/userwithbg-removebg-preview.png'

const ReviewsSection = () => {

  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false); // 👈 new state for form toggle
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
    orderId: '',
  });

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteReviewCollectionId);
        setReviews(response.documents);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
  
    getReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, comment, orderId, rating } = formData;
  
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();
    const trimmedOrderId = orderId.trim();
  
    if (!trimmedName || !trimmedComment || !trimmedOrderId) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      // Step 1: Validate order ID
      const orderRes = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteOrderCollectionId
      );
  
      const validOrderIds = orderRes.documents.map(doc => doc.$id);
  
      if (!validOrderIds.includes(trimmedOrderId)) {
        alert("Invalid Order ID. Please enter a valid one.");
        return;
      }
  
      // Step 2: Check for existing reviews for this orderId
      const existingReviewRes = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteReviewCollectionId,
        [Query.equal("orderId", trimmedOrderId)]  // ✅ Correct query
      );
  
      if (existingReviewRes.documents.length > 0) {
        const previousReview = existingReviewRes.documents[0];
        const reviewDate = new Date(previousReview.$createdAt);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
        if (reviewDate > sixMonthsAgo) {
          alert("It looks like you've already shared your feedback for this order. You can only post one review per order.");
          return;
        }
      }
  
      // Step 3: Submit review
      const res = await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteReviewCollectionId,
        ID.unique(),
        {
          name: trimmedName,
          comment: trimmedComment,
          orderId: trimmedOrderId,
          rating: Number(rating)
        }
      );
  
      setReviews([res, ...reviews]);
      setFormData({ name: '', rating: 5, comment: '', orderId: '' });
      alert('Thank you for your review!');
      setShow(false);
      setShowForm(false);
  
    } catch (error) {
      console.error("Error submitting review", error);
      alert("Something went wrong. Try again.");
    }
  };    

  return (
    <div className='px-2'>
      <section className={`px-4 ${show ? '' : 'hidden'} py-10 fixed z-[100] max-h-[88vh] top-7 w-[80vw] mx-[10vw] bg-white scrollBarHide overflow-x-hidden overflow-y-auto rounded-xl`}>
        <IoCloseCircleOutline className='text-black cursor-pointer hover:text-gray-500 h-9 w-9 absolute top-3 right-3' onClick={() => setShow(false)} />
        <h2 className="text-3xl text-black font-bold mb-8 text-center">CUSTOMER REVIEWS</h2>

        {/* Reviews Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {reviews.map((review, index) => (
            <div key={index} className="bg-black p-6 rounded-xl shadow-md">
              <div className="flex items-center">
                <img src={user} alt="" className='h-12 w-12 object-cover inn' />
              <div className="text-xl font-semibold text-white mb-1">{review.name}</div>
              </div>
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Add Review Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-600 cursor-pointer duration-200"
          >
            Add Review
          </button>
        )}

        {/* Add Review Form */}
        {showForm && (
          <div className="bg-black relative p-6 rounded-xl shadow-md mt-6">
            <IoCloseCircleOutline className='text-white cursor-pointer hover:text-gray-500 h-9 w-9 absolute top-3 right-3' onClick={() => setShowForm(false)} />
            <h3 className="text-2xl font-semibold mb-4 text-white">Add a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-white">Recent Order ID</label>
                <input
                  type="text"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-white">Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white">Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows="4"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black rounded-md cursor-pointer duration-200 hover:bg-gray-400"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </section>

      {/* Outside review button */}
      <div>
        <div
          className="cont bg-white px-2 py-3.5 rounded-xl mx-auto mb-10 cursor-pointer w-[180px]"
          onClick={() => setShow(true)}
        >
          <div className="button text-black flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center gap-1.5">
              <FaStar className='text-[#F59F00] text-[1rem]' />
              <FaStar className='text-[#F59F00] text-[1rem]' />
              <FaStar className='text-[#F59F00] text-[1rem]' />
              <FaStar className='text-[#F59F00] text-[1rem]' />
              <FaStar className='text-[#F59F00] text-[1rem]' />
            </div>
            <div className='text-[1.3rem] font-bold'>Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
