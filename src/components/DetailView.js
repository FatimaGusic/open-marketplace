import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailView = () => {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const response = await fetch(
          `https://marketplace-api.sshopencloud.eu/api/tools-services/${id}`
        );

        if (!response.ok) {
          throw new Error("Item not found or unable to retrieve details.");
        }

        const data = await response.json();
        setItemDetail(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;

  if (error || !itemDetail) {
    return (
      <div className="text-center text-red-500">
        This item is not within the tools or services category.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {itemDetail.label}
      </h1>

      {itemDetail.media && itemDetail.media.length > 0 && (
        <div className="flex justify-center mb-6">
          <img
            src={itemDetail.media[0].info.location.sourceUrl}
            alt={itemDetail.label}
            className="rounded-lg shadow-lg"
          />
        </div>
      )}

      <p className="text-gray-700 text-lg mb-4">{itemDetail.description}</p>

      <div className="mb-4">
        <strong>Category:</strong> <span>{itemDetail.category}</span>
      </div>

      {itemDetail.properties && (
        <div className="mb-4">
          <strong>Terms of Use:</strong>
          {itemDetail.properties
            .filter((prop) => prop.type.code === "terms-of-use")
            .map((prop, idx) => (
              <span key={idx} className="ml-2">
                {prop.value}
              </span>
            ))}
        </div>
      )}

      {itemDetail.properties && (
        <div className="mb-4">
          <strong>Mode of Use:</strong>
          {itemDetail.properties
            .filter((prop) => prop.type.code === "mode-of-use")
            .map((prop, idx) => (
              <span key={idx} className="ml-2">
                {prop.concept.label}
              </span>
            ))}
        </div>
      )}

      {itemDetail.properties && (
        <div className="mb-4">
          <strong>Activities:</strong>
          {itemDetail.properties
            .filter((prop) => prop.type.code === "activity")
            .map((prop, idx) => (
              <span key={idx} className="ml-2">
                {prop.concept.label}
              </span>
            ))}
        </div>
      )}

      {itemDetail.contributors && (
        <div className="mb-4">
          <strong>Contributors:</strong>
          {itemDetail.contributors.map((contrib, idx) => (
            <div key={idx} className="ml-2">
              {contrib.actor.name} - {contrib.role.label}
            </div>
          ))}
        </div>
      )}

      {itemDetail.accessibleAt && (
        <div className="mb-4">
          <strong>Accessible At:</strong>
          <a
            href={itemDetail.accessibleAt[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-2"
          >
            {itemDetail.accessibleAt[0]}
          </a>
          []
        </div>
      )}

      {itemDetail.source && (
        <div className="mb-4">
          <strong>Source:</strong>
          <a
            href={itemDetail.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-2"
          >
            {itemDetail.source.label}
          </a>
        </div>
      )}
    </div>
  );
};

export default DetailView;
