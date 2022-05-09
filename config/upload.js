
//importar o pacote multer
const multer = require('multer')

//configurar o padrão de armazenamento
const armazenamento = multer.diskStorage(
    //pasta de destino
    {
        destination:(req,file,cb)=>{
            cb(null,'./uploads/')
        },
        //definir o padrão para os nomes dos arquivos
        filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname)
        }
    }
)
//definimos que o tamanho máximo é de 100kb (100*1024)
var tamanho = 100*1024

var upload = multer({
    storage:armazenamento,
    limits:{fileSize:tamanho},
    fileFilter:(req,file,cb)=>{
        if(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error('Tipo de arquivo inválido'))
        }
    }
}).single('imagem')

module.exports = upload
