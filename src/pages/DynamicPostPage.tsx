"use client";
import * as React from "react";
import { useParams } from "react-router-dom";
import { NoticePostTemplate, PostData } from "@/components/templates/NoticePostTemplate";
import { postTypeConfigs, fetchPostData, PostType } from "@/utils/postTypes";

interface DynamicPostPageProps {
  postType: PostType;
}

export const DynamicPostPage: React.FC<DynamicPostPageProps> = ({ postType }) => {
  const { id } = useParams<{ id: string }>();
  const [postData, setPostData] = React.useState<PostData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadPostData = async () => {
      if (!id) {
        setError("Post ID is required");
        setLoading(false);
        return;
      }

      const postId = parseInt(id, 10);
      if (isNaN(postId)) {
        setError("Invalid post ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchPostData(postType, postId);
        setPostData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [postType, id]);

  const config = postTypeConfigs[postType];

  // Render additional content based on post type
  const renderAdditionalContent = () => {
    if (!postData) return null;

    switch (postType) {
      case 'service-providers':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Job Details</h3>
            <div className="space-y-3">
              {postData.company && (
                <div>
                  <span className="font-medium">Company:</span> {postData.company}
                </div>
              )}
              {postData.salary_range && (
                <div>
                  <span className="font-medium">Salary Range:</span> {postData.salary_range}
                </div>
              )}
              {postData.job_type && (
                <div>
                  <span className="font-medium">Job Type:</span> {postData.job_type}
                </div>
              )}
              {postData.location && (
                <div>
                  <span className="font-medium">Location:</span> {postData.location}
                </div>
              )}
              {postData.requirements && (
                <div>
                  <span className="font-medium">Requirements:</span>
                  <p className="mt-1 text-gray-600">{postData.requirements}</p>
                </div>
              )}
              {postData.contact_email && (
                <div>
                  <span className="font-medium">Contact:</span> {postData.contact_email}
                </div>
              )}
            </div>
          </div>
        );

      case 'classified-ads':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Item Details</h3>
            <div className="space-y-3">
              {postData.price && (
                <div className="text-2xl font-bold text-green-600">
                  ${postData.price}
                </div>
              )}
              {postData.category && (
                <div>
                  <span className="font-medium">Category:</span> {postData.category}
                </div>
              )}
              {postData.condition && (
                <div>
                  <span className="font-medium">Condition:</span> {postData.condition}
                </div>
              )}
              {postData.location && (
                <div>
                  <span className="font-medium">Location:</span> {postData.location}
                </div>
              )}
              {postData.company && (
                <div>
                  <span className="font-medium">Seller:</span> {postData.company}
                </div>
              )}
              {postData.contact_email && (
                <div>
                  <span className="font-medium">Contact:</span> {postData.contact_email}
                </div>
              )}
              {postData.phone && (
                <div>
                  <span className="font-medium">Phone:</span> {postData.phone}
                </div>
              )}
            </div>
          </div>
        );

      case 'reputable-agents':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Agent Information</h3>
            <div className="space-y-3">
              {postData.specialization && (
                <div>
                  <span className="font-medium">Specialization:</span> {postData.specialization}
                </div>
              )}
              {postData.experience_years && (
                <div>
                  <span className="font-medium">Experience:</span> {postData.experience_years} years
                </div>
              )}
              {postData.rating && (
                <div className="flex items-center">
                  <span className="font-medium">Rating:</span>
                  <div className="ml-2 flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{postData.rating}/5</span>
                  </div>
                </div>
              )}
              {postData.location && (
                <div>
                  <span className="font-medium">Location:</span> {postData.location}
                </div>
              )}
              {postData.contact_email && (
                <div>
                  <span className="font-medium">Email:</span> {postData.contact_email}
                </div>
              )}
              {postData.phone && (
                <div>
                  <span className="font-medium">Phone:</span> {postData.phone}
                </div>
              )}
            </div>
          </div>
        );

      case 'reputable-companies':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Company Information</h3>
            <div className="space-y-3">
              {postData.category && (
                <div>
                  <span className="font-medium">Industry:</span> {postData.category}
                </div>
              )}
              {postData.rating && (
                <div className="flex items-center">
                  <span className="font-medium">Rating:</span>
                  <div className="ml-2 flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{postData.rating}/5</span>
                  </div>
                </div>
              )}
              {postData.location && (
                <div>
                  <span className="font-medium">Location:</span> {postData.location}
                </div>
              )}
              {postData.contact_email && (
                <div>
                  <span className="font-medium">Email:</span> {postData.contact_email}
                </div>
              )}
              {postData.phone && (
                <div>
                  <span className="font-medium">Phone:</span> {postData.phone}
                </div>
              )}
            </div>
          </div>
        );

      case 'tips-tricks':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Tip Information</h3>
            <div className="space-y-3">
              {postData.category && (
                <div>
                  <span className="font-medium">Category:</span> {postData.category}
                </div>
              )}
              {postData.author && (
                <div>
                  <span className="font-medium">Author:</span> {postData.author}
                </div>
              )}
              {postData.posted_date && (
                <div>
                  <span className="font-medium">Posted:</span> {new Date(postData.posted_date).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <NoticePostTemplate
      postData={postData || { id: 0, title: "", content: "" }}
      postTypeConfig={config}
      loading={loading}
      error={error}
    >
      {renderAdditionalContent()}
    </NoticePostTemplate>
  );
};

export default DynamicPostPage;
