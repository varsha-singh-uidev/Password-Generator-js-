let global_var = ""; //global varible deceleraton
let global_length = 0;//use to store the last generated password length
let global_type = 0;//use to store the last generated password type 

class PasswordGenerator {
    constructor() {
        this.uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.lowercase = "abcdefghijklmnopqrstuvwxyz";
        this.numbers = "0123456789";
        this.specialChars = "!@#$%&*`~_+=?:/";
        
        this.funnyPasswords = [
            "ILovePineapplePizza123", "MemeLord420", "Wi-Fry Chicken Here",
            "WhySoSerious!HaHa", "404PasswordNotFound", "TrustMeImAnEngineer",
            "MermaidsDontDoHomework", "IAmTheRealZuckerberg", "IKnowHowToSpell",
            "ConnectAndDie", "YoureDoneNow", "TopSecretNetwork",
            "PasswordIsPassword", "ComeAndCleanUpMyHouse", "WiFi10$PerMinute",
            "DontEvenTryIt", "Anonymouse", "RedHatHacker"
        ];
    }

    generatePassword(type, length){
        let charset = "";
        switch(type)
        {
            case 'easy' :
                charset = this.uppercase;
                break;
            case 'strong' :
                charset = this.uppercase + this.lowercase + this.numbers;
                break;
            case 'super-strong' :
                charset = this.uppercase + this.lowercase + this.specialChars + this.numbers;
                break;
            case 'funny' :
                return this.generateFunny();
        }
        
        return this.generateRandom(charset, length);
    }

    generateRandom(charset,length){
        let password = "";
        for(let i = 0; i < length; i++){
            let randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    generateFunny(){
        return this.funnyPasswords[Math.floor(Math.random() * this.funnyPasswords.length)];
    }

}
// Initialize Password Generator
const generator = new PasswordGenerator();

// Function to generate and display password
function generate() {
    let selectedOption = document.querySelector('input[name="passwordType"]:checked');
    let passwordLengthInput = document.querySelector(".length");
    let display = document.querySelector(".password-display");

    if(passwordLengthInput.value < 4 || isNaN(passwordLengthInput.value)){
        display.textContent = "⚠️Choose a valid number";
        return;
    }

    if (!selectedOption) {
        display.textContent = "⚠️ Please select a password type!";
        return;
    }

    let type = selectedOption.value; //getting thr type of selected value
    let length = parseInt(passwordLengthInput.value);

    if (isNaN(length) || length < 4) {
        display.textContent = " Please enter a valid password length (4-20)!";
        return;
    }

    let password = generator.generatePassword(type, length);
    display.textContent = global_var = `🔏${password}`;
    global_length = password.length;
    global_type = type;

}

// Attach event listener to the button
document.querySelector(".generate-btn").addEventListener("click", generate);

let click_btn = document.querySelector(".copy-btn");
let display = document.querySelector(".password-display");

click_btn.addEventListener("click",function(){

    let copy_text = display.textContent.trim();

    navigator.clipboard.writeText(copy_text).then(() => {
        click_btn.textContent = "Copied";
        setTimeout(() => {
            click_btn.textContent = "Copy"
        },2000);
    }).catch((error) => {
        click_btn.textContent = "failed";
        setTimeout(() => {
            click_btn.textContent = "Copy"
        },2000);
    });
});

let regenerate_btn = document.querySelector(".regenerate");

regenerate_btn.addEventListener("click", function() {
    let display = document.querySelector(".password-display");

    if(global_var === "")
    {
        display.textContent = "⚠️ Please generate a password first!";
        return;
    }
    let new_password = generator.generatePassword(global_type, global_length);
    display.textContent = `🔏${new_password}`;
    global_var = new_password;
});


