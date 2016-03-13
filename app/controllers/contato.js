var sanitize = require('mongo-sanitize');

module.exports = function (app) {

  var Contato = app.models.contato;
  var controller = {};

  controller.listaContatos = function (req, res) {
    Contato.find().populate('emergencia').exec()
      .then(
        function (contatos) {
          res.json(contatos);
        },
        function (erro) {
          console.log(erro);
          res.status(500).json(erro);
        }
      );
  };

  controller.obtemContato = function (req, res) {
    var idContato = sanitize(req.params.id);
    console.log('API: obtemContato: ' + idContato);
    Contato.findById(idContato).exec()
      .then(
        function (contato) {
          if (!contato) throw new Error('Contato não encontrado');
          res.json(contato);
        },
        function (erro) {
          console.log(erro);
          res.status(404).json(erro);
        }
      );
  };

  controller.removeContato = function (req, res) {
    var idContato = sanitize(req.params.id);
    console.log('API: removeContato: ' + idContato);

    Contato.remove({"_id": idContato}).exec()
      .then(
        function () {
          res.end();
        },
        function (erro) {
          return console.error(erro);
        }
      );

  };

  controller.salvaContato = function (req, res) {
    console.log('API: salvaContato');
    var _id = req.body._id;

    var dados = {
      "nome": req.body.nome,
      "email": req.body.email,
      "emergencia": req.body.emergencia || null
    };

    if (_id) {
      Contato.findByIdAndUpdate(_id, dados).exec()
        .then(
          function (contato) {
            res.json(contato);
          },
          function (erro) {
            console.log(erro);
            res.status(500).json(erro);
          }
        );
    } else {
      Contato.create(dados)
        .then(
          function (contato) {
            res.status(201).json(contato);
          },
          function (erro) {
            console.log(erro);
            res.status(500).json(erro);
          }
        );
    }
  };

  return controller;
};