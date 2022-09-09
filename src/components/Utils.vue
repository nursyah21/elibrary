<script>
import bcrypt from 'bcryptjs'
export default{
  methods:{
    checkNim(nim){
      if(nim.length != 10)return false
      return /^\d+$/.test(nim)
    },
    checkEmail(email){
      return /.*@(student.*.)?ittelkom-sby.ac.id$/.test(email.trim())
    },
    encryptPass(pass){
      return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
    },
    comparePass(pass, hash){
      return bcrypt.compareSync(pass, hash)
    }
  }
}
</script>