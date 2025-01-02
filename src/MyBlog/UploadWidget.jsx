import { useState, useEffect } from "react";
const UploadWidget = ({ setFormData, formData }) => {
  const [widget, setWidget] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.type = "text/javascript";

    script.onload = () => {
      const myWidget = cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_REACT_APP_CLOUD_NAME,
          uploadPreset: import.meta.env.VITE_REACT_APP_UPLOAD_PROCESS,
          resourceType: "auto",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setFormData((prev) => ({
              ...prev,
              imageUrl: result.info.secure_url,
              resourceType: result.info.resource_type,
            }));
            console.log("Done! Here is the file info: ", result.info);
          }
        }
      );

      setWidget(myWidget);

      document
        .getElementById("upload_widget")
        .addEventListener("click", function (e) {
          e.preventDefault();
          myWidget.open();
        });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [setFormData]);

  const isVideo = formData?.resourceType === "video";

  return (
    <div>
      {!formData?.imageUrl ? (
        <button id="upload_widget" className="cloudinary-button">
          Upload files
        </button>
      ) : (
        <div className="mb-4">
          <label className="block mb-1">Preview:</label>
          {formData?.imageUrl && formData?.resourceType === "video" ? (
            <video controls width="100%" className="rounded">
              <source src={formData.imageUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : formData?.imageUrl ? (
            <img
              src={formData.imageUrl}
              alt="Uploaded Media"
              className="w-full h-64 object-cover rounded"
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
