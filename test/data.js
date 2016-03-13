var MongoClient = require('mongodb').MongoClient;

var contatos = [
  {nome: 'Teste Contato 1', email: 'contato1@teste.com'},
  {nome: 'Teste Contato 2', email: 'contato2@teste.com'},
  {nome: 'Teste Contato 3', email: 'contato3@teste.com'}
];

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh_test', function (erro, db) {
  if (erro) throw err;

  db.dropDatabase(function (err) {
    if (err) return console.log(err);
    console.log('Banco apagado com sucesso!');

    db.collection('contatos').insert(contatos, function (err, inserted) {
      if (err) return console.log(err);
      console.log('Banco populado com sucesso!');
      process.exit(0);
    });

  });
});
