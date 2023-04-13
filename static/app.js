class Chatbox {
    constructor(){
        this.args = {
            openButton : document.querySelector('.chatbox__button'),
            chatBox : document.querySelector('.chatbox__support'),
            sendButton : document.querySelector('.send__button')
            }
            this.state = false;
            this.messages = [];
            console.log(this.messages)
        }
    

    display() { 
            const{openButton, chatBox, sendButton} = this.args;

            openButton.addEventListener('click', () => this.toggleState (chatBox))
            sendButton.addEventListener('click', () => this.onSendButton(chatBox))

            const node = chatBox.querySelector ('input');
            node.addEventListener("keyup",({key}) => {
                if (key === "Enter") {
                    this.onSendButton(chatBox)
                }
            })
        }

    toggleState(chatbox) {
            this.state = !this.state;

            // show or hides the box
            if(this.state) {
            chatbox.classList.add('chatbox--active')
            } 
            else {
            chatbox.classList.remove('chatbox--active')
            }
        }


    onSendButton (chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1}
        this.messages.push(msg1);
        

        //http://127.0.0.1:5000/predict

    fetch('https://oscorp.azurewebsites.net/predict', {
        method: 'POST',
        body: JSON.stringify({ message: text1 }),
//         mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        .then(r => r.json()) 
        .then (r => {
            let msg2 = { name: "Vision", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText (chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText (chatbox)
            textField.value=''
        });
    }

    updateChatText (chatbox) {
        var html = '';
        this.messages.slice ().reverse().forEach(function(item,index) {
        if (item.name === "Vision")
            {
            html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
        else
            {
            html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();

//FOR SECTION ANIMATION
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } 
      else {
        reveals[i].classList.remove("active");
      }
    }
}
  
window.addEventListener("scroll", reveal);


//SCROLL TO TOP BUTTON 
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } 
  else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
