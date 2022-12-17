
const loginVerification = (otpCode) => {
    return `
    <!DOCTYPE html>
    <html>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <head>
        <title>TRADE SHOW ZONE</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    
        <style>
            p,
            h3 {
                margin: 0;
            }
    
            .top-logo {
                margin-top: 35px;
            }
    
            .padding-48 {
                padding: 48px 48px 0px;
            }
    
           
    
            @media only screen and (max-width: 414px) {
                .email-container {
                    min-width: 414px !important;
                }
    
                .btn {
                    font-size: 10px !important;
                }
    
                .logo {
                    width: 30% !important;
                }
    
                .pix {
                    width: 40% !important;
                }
    
                .centerTextFont {
                    font-size: 12px !important;
                }
    
                .bg-image {
                    background-image: none;
                }
    
                .top-logo {
                    margin-top: 10px;
                }
    
                .padding-48 {
                    padding: 15px 15px 0px;
                }
            }
        </style>
    </head>
    
    <body style=" background:rgb(255, 255, 255);margin: 0;font-family: 'Montserrat', sans-serif; max-width: 617px; margin: 0 auto;"
        class="email-container">
        <!-- <div class="bg-image" -->
        <div class=""
            style="background-image: url('https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/Group_3450.png');;
            background-color : rgb(255, 255, 255); background-position: center;background-repeat: no-repeat; background-size: cover; padding: 22px; background-origin: content-box, padding-box;">
            <div style="text-align: center ;">
                <img class="pix" style="width: 300px; margin-top: 15px;"
                    src="https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/BAT_logo-06.png" alt="logo is ...."
                    background-color="f8f8f8">
            </div>
            <div class="padding-48">
              
                <h1 style="text-align: center;height:15px;color: #000000;">Verification Code</h1>
                <h2 style="text-align: center;font-weight: 500;height:30px; font-size: 40px;color: #000000;">${otpCode}</h2>
                <!-- <div style="text-align: center;font-weight: 100;font-size: 12px;color: #D9B83B;">Ticket ID:</div> -->
                <div class="heading" style="display: inline-block; ">
                    <p style="text-align: center;font-size:10px;color: #5c5656;"> Here is your OTP verification code 
                    </p>
                    <p style="text-align: center;font-size:10px;color: #5c5656;"> It will expire in 10 minutes
                    </p>
                    <div class="centerTextFont"
                        style="line-height: 25px; color: #313131; margin-top:40px; text-align: center;padding: 0 40px;">
                       If you did not try to sign in just now,</br> please 
                       change your password to protect your account
                   
                    <div class="heading2" style="text-align: center;color:#8CC63F;font-size:22px; margin-top:100px;">
                        <p style="text-align:center; line-height: 25px; font-size: small;">Sent by  Afforestation Portal
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <footer >
            <div style="text-align: center; padding: 25px; ">
                
                 <img src="https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/Group_33.png" alt="logo is ...." width="auto" height="auto"
                    background-color="f8f8f8" style="padding: 0px 6px">
                <img src="https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/Group_32.png" alt="logo is ...." width="auto" height="auto"
                    background-color="f8f8f8" style="padding: 0px 6px">
                <img src="https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/Group_31.png" alt="logo is ...." width="auto" height="auto"
                    background-color="f8f8f8" style=" padding: 0 6px;"><br>
                    <sup style="color: black;">Copyright @Afforestation Portal</sup>
            </div>
        </footer>
    </body>
    
    </html>
    `
};



const passwordReset = (password) => {
    return `
    <!DOCTYPE html>
    <html>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <head>
        <title>TRADE SHOW ZONE</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    
        <style>
            p,
            h3 {
                margin: 0;
            }
    
            .top-logo {
                margin-top: 35px;
            }
    
            .padding-48 {
                padding: 48px 48px 0px;
            }
    
           
    
            @media only screen and (max-width: 414px) {
                .email-container {
                    min-width: 414px !important;
                }
    
                .btn {
                    font-size: 10px !important;
                }
    
                .logo {
                    width: 30% !important;
                }
    
                .pix {
                    width: 40% !important;
                }
    
                .centerTextFont {
                    font-size: 12px !important;
                }
    
                .bg-image {
                    background-image: none;
                }
    
                .top-logo {
                    margin-top: 10px;
                }
    
                .padding-48 {
                    padding: 15px 15px 0px;
                }
            }
        </style>
    </head>
    
    <body style=" background:rgb(255, 255, 255);margin: 0;font-family: 'Montserrat', sans-serif; max-width: 617px; margin: 0 auto;"
        class="email-container">
        <!-- <div class="bg-image" -->
        <div class=""
            style="background-image: url('https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/Group_3450.png');;
            background-color : rgb(255, 255, 255); background-position: center;background-repeat: no-repeat; background-size: cover; padding: 22px; background-origin: content-box, padding-box;">
            <div style="text-align: center ;">
                <img class="pix" style="width: 300px; margin-top: 15px;"
                    src="https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/BAT_logo-06.png" alt="logo is ...."
                    background-color="f8f8f8">
            </div>
            <div class="padding-48">
              
                <h1 style="text-align: center;height:15px;color: #000000;">New Password</h1>
                <h2 style="text-align: center;font-weight: 500;height:30px; font-size: 40px;color: #000000;">${password}</h2>
                <!-- <div style="text-align: center;font-weight: 100;font-size: 12px;color: #D9B83B;">Ticket ID:</div> -->
                <div class="heading" style="display: inline-block; ">
                <p style="text-align: center;font-size:10px;color: #5c5656;"> Here is your new password 
                    </p>
                    <p style="text-align: center;font-size:10px;color: #5c5656;"> Please use the above shared new password to login.
                    </p>
                      
                <div class="centerTextFont"
                        style="line-height: 25px; color: #313131; margin-top:40px; text-align: center;padding: 0 40px;">
                        If you did not forget your password then please discard this email.
                   
                    <div class="heading2" style="text-align: center;color:#8CC63F;font-size:22px; margin-top:100px;">
                        <p style="text-align:center; line-height: 25px; font-size: small;">Sent by Afforestation Portal
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <footer >
            <div style="text-align: center; padding: 25px; ">
                
                 <img src="https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/Group_33.png" alt="logo is ...." width="auto" height="auto"
                    background-color="f8f8f8" style="padding: 0px 6px">
                <img src="https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/Group_32.png" alt="logo is ...." width="auto" height="auto"
                    background-color="f8f8f8" style="padding: 0px 6px">
                <img src="https://afforestation-bucket.s3.ap-south-1.amazonaws.com/email_assets/Group_31.png" alt="logo is ...." width="auto" height="auto"
                    background-color="f8f8f8" style=" padding: 0 6px;"><br>
                    <sup style="color: black;">Copyright @Afforestation Portal</sup>
            </div>
        </footer>
    </body>
    
    </html>
    `
};


module.exports = {
    loginVerification,
    passwordReset
};
