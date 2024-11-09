import styles from "../styles/Admin.module.css";
import { useState, useEffect } from "react";
import editIcon from "../assets/edit.png";
import update from "../assets/update.png";
import { ToastContainer, toast, Bounce } from "react-toastify";

const StudentVisaContent = () => {
  const notifySuccess = () => {
    toast.success("Success", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const notifyError = () => {
    toast.error("Request Rejected, Please try again later.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const notifySize = () => {
    toast.error("Large Image Size Received.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const [sectionDataSingle, setSectionDataSingle] = useState({
    StudVisaHeading: "",
    StudVisaPara: "",

    PathwaysHeading: "",
    PathwaysCard1Head: "",
    PathwaysCard1Para: "",
    PathwaysCard2Head: "",
    PathwaysCard2Para: "",
    PathwaysCard3Head: "",
    PathwaysCard3Para: "",

    StartJourHeading: "",
    StartPara: "",

    WhyChooseUsHeading01: "",
    wcu1: "",
    wcu2: "",
    wcu3: "",
    wcu4: "",

    faq_heading: "",
    q1: "",
    qa1: "",
    q2: "",
    qa2: "",
    q3: "",
    qa3: "",
    q4: "",
    qa4: "",
    q5: "",
    qa5: "",
    q6: "",
    qa6: "",
    q7: "",
    qa7: "",
    q8: "",
    qa8: "",
    q9: "",
    qa9: "",
    q10: "",
    qa10: "",

    show_testimonials: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    setSectionDataSingle({
      ...sectionDataSingle,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleUpdateClick = () => {
    if (!sectionDataSingle._id) {
      console.error("No ID found for update.");
      return;
    }

    fetch(
      `https://brightlight-node.onrender.com/studentVisa/${sectionDataSingle._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionDataSingle),
      }
    )
      .then((response) => {
        if (response.status === 413) {
          notifySize();
          throw new Error("Payload too large");
        } else if (!response.ok) {
          notifyError();
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then(() => {
        notifySuccess();
        setEditMode(false);
      })
      .catch((error) => {
        notifyError();
        console.error("Error updating data:", error);
      });
  };

  useEffect(() => {
    fetch("https://brightlight-node.onrender.com/studentVisa")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSectionDataSingle(data[0]);
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={styles.singleSectionData}>
      <ToastContainer />

      <input
        placeholder="Study Visa Heading"
        name="StudVisaHeading"
        value={sectionDataSingle.StudVisaHeading || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Study Visa Paragraph"
        name="StudVisaPara"
        value={sectionDataSingle.StudVisaPara || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Pathways Heading"
        name="PathwaysHeading"
        value={sectionDataSingle.PathwaysHeading || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Pathways Card 1 Heading"
        name="PathwaysCard1Head"
        value={sectionDataSingle.PathwaysCard1Head || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Pathways Card 1 Paragraph"
        name="PathwaysCard1Para"
        value={sectionDataSingle.PathwaysCard1Para || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Pathways Card 2 Heading"
        name="PathwaysCard2Head"
        value={sectionDataSingle.PathwaysCard2Head || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Pathways Card 2 Paragraph"
        name="PathwaysCard2Para"
        value={sectionDataSingle.PathwaysCard2Para || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Pathways Card 3 Heading"
        name="PathwaysCard3Head"
        value={sectionDataSingle.PathwaysCard3Head || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Pathways Card 3 Paragraph"
        name="PathwaysCard3Para"
        value={sectionDataSingle.PathwaysCard3Para || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Start Journey Heading"
        name="StartJourHeading"
        value={sectionDataSingle.StartJourHeading || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Start Journey Paragraph"
        name="StartPara"
        value={sectionDataSingle.StartPara || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <input
        placeholder="Why Choose Us Heading"
        name="WhyChooseUsHeading01"
        value={sectionDataSingle.WhyChooseUsHeading01 || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />
      <textarea
        placeholder="Why Choose Us Point 1"
        name="wcu1"
        value={sectionDataSingle.wcu1 || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />
      <textarea
        placeholder="Why Choose Us Point 2"
        name="wcu2"
        value={sectionDataSingle.wcu2 || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

      <textarea
        placeholder="Why Choose Us Point 3"
        name="wcu3"
        value={sectionDataSingle.wcu3 || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />
      <textarea
        placeholder="Why Choose Us Point 4"
        name="wcu4"
        value={sectionDataSingle.wcu4 || ""}
        onChange={handleInputChange}
        disabled={!editMode}
      />

<h1 className={styles.faqStartsHeading}>FAQ's Starts Below</h1>

<input
  placeholder="FAQ's Made Simple"
  name="faq_heading"
  value={sectionDataSingle.faq_heading || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 1"
  name="q1"
  value={sectionDataSingle.q1 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 1"
  name="qa1"
  value={sectionDataSingle.qa1 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 2"
  name="q2"
  value={sectionDataSingle.q2 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 2"
  name="qa2"
  value={sectionDataSingle.qa2 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 3"
  name="q3"
  value={sectionDataSingle.q3 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 3"
  name="qa3"
  value={sectionDataSingle.qa3 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 4"
  name="q4"
  value={sectionDataSingle.q4 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 4"
  name="qa4"
  value={sectionDataSingle.qa4 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 5"
  name="q5"
  value={sectionDataSingle.q5 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 5"
  name="qa5"
  value={sectionDataSingle.qa5 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 6"
  name="q6"
  value={sectionDataSingle.q6 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 6"
  name="qa6"
  value={sectionDataSingle.qa6 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 7"
  name="q7"
  value={sectionDataSingle.q7 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 7"
  name="qa7"
  value={sectionDataSingle.qa7 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 8"
  name="q8"
  value={sectionDataSingle.q8 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 8"
  name="qa8"
  value={sectionDataSingle.qa8 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 9"
  name="q9"
  value={sectionDataSingle.q9 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 9"
  name="qa9"
  value={sectionDataSingle.qa9 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<input
  placeholder="Question 10"
  name="q10"
  value={sectionDataSingle.q10 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>
<textarea
  placeholder="Answer 10"
  name="qa10"
  value={sectionDataSingle.qa10 || ""}
  onChange={handleInputChange}
  disabled={!editMode}
/>

<h1 className={styles.faqEndHeading}>FAQ's Ends here</h1>
      
      <h1 className={styles.faqStartsHeading}>
        Testimonials Visibility Control
      </h1>

      <div className={styles.testimonialsVisibility}>
        <p>Want to display Testimonials Section</p>
        <input
          placeholder="Show Testimonials"
          name="show_testimonials"
          value={sectionDataSingle.show_testimonials || ""}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      <p className={styles.testimonialsDisclamier}>
        Note: Testimonials Visibility On the Selected Page is totally dependent
        on the input value above. If you want to display the section , just
        write "Y" without quotes , anything else will be considered as "N" even
        "y". If not want to display then just write "N" without qoutes.
      </p>
      
      <div className={styles.editIcons}>
        {editMode ? (
          <img
            src={update}
            className={styles.updateIcon}
            onClick={handleUpdateClick}
            alt="Update"
          />
        ) : (
          <img
            src={editIcon}
            className={styles.editIcon}
            onClick={handleEditClick}
            alt="Edit"
          />
        )}
      </div>
    </div>
  );
};

export default StudentVisaContent;