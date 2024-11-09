import { jsPDF } from 'jspdf'; // Proper import with types

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement | null;
    const resumeOutputElement = document.getElementById('resumeOutput') as HTMLDivElement;

    if (form && resumeOutputElement) {
        form.addEventListener('submit', (event: Event) => {
            event.preventDefault(); // Prevent form submission and page reload

            // Get form elements
            const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement | null;
            const nameElement = document.getElementById('name') as HTMLInputElement | null;
            const emailElement = document.getElementById('email') as HTMLInputElement | null;
            const phoneElement = document.getElementById('phone') as HTMLInputElement | null;
            const educationElement = document.getElementById('education') as HTMLTextAreaElement | null;
            const experienceElement = document.getElementById('experience') as HTMLTextAreaElement | null;
            const skillsElement = document.getElementById('skills') as HTMLTextAreaElement | null;

            // Check if all required form elements exist
            if (
                profilePictureInput &&
                nameElement &&
                emailElement &&
                phoneElement &&
                educationElement &&
                experienceElement &&
                skillsElement
            ) {
                const profilePictureFile = profilePictureInput.files ? profilePictureInput.files[0] : null;
                const name = nameElement.value;
                const email = emailElement.value;
                const phone = phoneElement.value;
                const education = educationElement.value;
                const experience = experienceElement.value;
                const skills = skillsElement.value;

                // Create a profile picture URL if uploaded
                const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

                // Resume content for HTML display
                const resumeContent = `
                    <h2>Resume</h2>
                    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" />` : ''}
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <h3>Education</h3>
                    <p>${education}</p>
                    <h3>Experience</h3>
                    <p>${experience}</p>
                    <h3>Skills</h3>
                    <p>${skills}</p>
                `;

                // Display the resume content in the output section
                resumeOutputElement.innerHTML = resumeContent;

                // Remove any existing download button
                const existingDownloadButton = resumeOutputElement.querySelector('button');
                if (existingDownloadButton) {
                    existingDownloadButton.remove();
                }

                // Create a button to download PDF
                const downloadPDFButton = document.createElement('button');
                downloadPDFButton.textContent = 'Download Your Resume as PDF';

                // Add click event listener for PDF download
                downloadPDFButton.addEventListener('click', () => {
                    try {
                        // Initialize jsPDF
                        const doc = new jsPDF();

                        // Add content to the PDF
                        doc.setFontSize(16);
                        doc.text('Resume', 20, 20); // Title
                        doc.setFontSize(12);
                        doc.text(`Name: ${name}`, 20, 30);
                        doc.text(`Email: ${email}`, 20, 40);
                        doc.text(`Phone: ${phone}`, 20, 50);
                        doc.text(`Education: ${education}`, 20, 60);
                        doc.text(`Experience: ${experience}`, 20, 70);
                        doc.text(`Skills: ${skills}`, 20, 80);

                        // If profile picture is available, add it to the PDF
                        if (profilePictureFile) {
                            const imgURL = URL.createObjectURL(profilePictureFile);
                            doc.addImage(imgURL, 'JPEG', 150, 20, 40, 40); // Image positioning and size
                        }

                        // Save the generated PDF
                        doc.save(`${name.replace(/\s+/g, '_')}_resume.pdf`);
                    } catch (error) {
                        console.error('Error generating PDF:', error);
                    }
                });

                // Append the download button to the resume output section
                resumeOutputElement.appendChild(downloadPDFButton);
            }
        });
    } else {
        console.error('Form element not found.');
    }
});
