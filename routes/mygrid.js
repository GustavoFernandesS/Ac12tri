module.exports = (app)=>{
    //importar as configurações do database
    var conexao = require('../config/database')
    //importar o modelo mygrid
    var modelo = require('../models/mygrid')

    //abrir o formulário mygrid.ejs
    app.get('/mygrid',(req,res)=>{
        //conectar com o database
        conexao()
        //buscar todos os documentos da colecao mygrid
        modelo.find().sort({_id:-1})
        .then((modelo)=>{
            res.render('mygrid.ejs',{dados:modelo})
        })
        .catch(()=>{
            res.render('mygrid.ejs')
        })
    })

    //gravar as informações do formulário
    app.post('/mygrid',(req,res)=>{
        //conectar com o database
        conexao()
        //gravar o documento na coleção mygrid
        var documento = new modelo({
            titulo:req.body.titulo,
            texto:req.body.texto
        }).save()
        .then(()=>{
            res.redirect('/mygrid')
        })
        .catch(()=>{
            res.send('Não foi possível gravar os dados no DB')
        })
    })

    //listar o documento para o excluir
    app.get('/mygrid_excluir', async(req,res)=>{
        //recuperar o id da barra de endereço
        var id = req.query.id
        //procurar o documento específico
        var procurar = await modelo.findOne({_id:id})
        //abrir a view mygrid_excluir e enviar a json do documento
        res.render('mygrid_excluir.ejs',{dados:procurar})
    })

    //listar o documento para o alterar
    app.get('/mygrid_alterar', async(req,res)=>{
        //recuperar o id da barra de endereço
        var id = req.query.id
        //procurar o documento específico
        var procurar = await modelo.findOne({_id:id})
        //abrir a view mygrid_alterar e enviar a json do documento
        res.render('mygrid_alterar.ejs', {dados:procurar})
    })

    //Excluir documento da colection atual 
    app.get('/excluir_mygrid', async(req, res)=>{
        //recuperando o id da barra de endereço
        var id = req.query.id
        //excluindo o documento da colection
        var excluir = await modelo.findOneAndRemove({_id:id})
        //voltar pra página mygrid
        res.redirect('/mygrid')
    })


    //alterar o documento da coleção atual
    app.post('/alterar_mygrid',async(req,res)=>{
        //recuperando o id da barra de endereços
        var id = req.query.id
        //recuperar as informações digitadas
        var dados = req.body
        //alterando o documento da coleção
        var alterar = await modelo.findOneAndUpdate(
            {_id:id},
            {titulo:dados.titulo,
            texto:dados.texto})
        //voltar para a página mygrid
        res.redirect('/mygrid')
    })

}