export default [
    {
        type: 'text', name: 'name', label: 'Ad', errors: {
            required: 'Ad boş ola bilməz',
            min: 3,
        }
    },
    {
        type: 'text', name: 'surname', label: 'Soyad', errors: {
            required: 'Soyad boş ola bilməz',
            min: 5
        },
    },
    {
        type: 'text', name: 'username', label: 'İstifadəçi Adı', errors: {
            required: 'Kullanıcı adı boş ola bilməz',
            min: 3,
            usernameExists: 'Bu istifadəçi adı mövcuddur' // Hata mesajı eklendi
        }
    },
    {
        type: 'email', name: 'email', label: 'Email', errors: {
            required: 'Email boş ola bilməz',
            email: 'Etibarlı e-poçt ünvanı daxil edin'
        },
    },
    {
        type: 'password', name: 'password', label: 'Şifre', errors: {
            required: 'Şifrə boş ola bilməz',
            min: 8
        },
    },
    {
        type: 'password', name: 'rpassword', label: 'Şifreyi Tekrarla', errors: {
            required: 'Şifrəni təkrar daxil edin',
            min: 8,
            same: 'Şifrələr eyni deyil'
        },
    }
]
