import Swal from 'sweetalert2';

class NotificationManager {
    static showAlert(options) {
        // Extract the buttons array from the options, if provided.
        const { buttons, ...restOptions } = options;
    
        // Initialize the footer with empty string
        let footer = "";
    
        // Check if buttons are provided and create button HTML
        if (buttons) {
          footer = '<div class="swal-footer-buttons">';
          buttons.forEach((button, index) => {
            footer += `<button id="swal-button-${index}" class="swal-footer-button">${button.text}</button>`;
          });
          footer += "</div>";
        }
    
        const alert = Swal.fire({
          ...restOptions,
          footer,
          inputAttributes: {
            style: "color: black"  // or any color that you prefer
          }
        });
    
        // Attach event listeners to the buttons, if provided.
        if (buttons) {
          buttons.forEach((button, index) => {
            document.getElementById(`swal-button-${index}`).addEventListener("click", button.callback);
          });
        }
    
        return alert;
      }
    
      static updateAlert(options) {
        Swal.update({
            icon: options.icon,
            title: options.title,
            text: options.text,
            input: null, // Add this line to manage the input field
            inputAttributes: options.inputAttributes || {
                style: "color: black" // or any color that you prefer
            }
        });
    }
    
    
      static showValidationMessage(message, type="error") {
        let color;
        
        switch (type) {
          case 'error':
            color = 'red';
            break;
          case 'success':
            color = 'green';
            break;
          case 'warning':
            color = 'orange';
            break;
          default:
            color = 'black';
            break;
        }
    
        const customHtml = `<span style="color: ${color}">${message}</span>`;
        
        Swal.showValidationMessage(customHtml);
    }
}

export default NotificationManager;
