import axios from 'axios'

const mailjet = () =>{
    axios.post('https://api.mailjet.com/v3/send',{
        withCredentials: false,
        auth:{
            username: import.meta.env.MAILJET_PUBLIC,
            password: import.meta.env.MAILJET_PRIVATE
        },
        data:{
            FromEmail:"nursyahjaya@outlook.com",
		    FromName: "nursyah",
		    Subject:"testing!",
		    'Text-part':"Testing Dear passenger, welcome to Mailjet! May the delivery force be with you!",
		    'Html-part':"<h3> Testing Dear passenger, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!<br />May the delivery force be with you!",
        }
    }).then(e=>{
        console.log(e)
    })
}


export default mailjet