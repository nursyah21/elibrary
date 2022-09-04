# elibrary-itts

account:
nim: 1234567890
pass: adminnih

description erd:

di table users:
`forget_password` akan mencatat tgl saat pertama kali diaktifkan dan `forget_password_url` akan menyimpan random text yang telah digenerate untuk menghapus password. ketika sudah lewat 1 hari maka akan `forget_password` dan `forget_password_url` akan di null kan.


di table books:
`count` menghitung berapa kali buku dipinjam