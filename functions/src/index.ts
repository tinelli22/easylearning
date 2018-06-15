const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

//const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
//const SENDGRID_API_KEY = functions.config().sendgrid.key;
const SENDGRID_API_KEY = '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';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

/*
exports.firestoreEmail = functions.firestore
    .document('professores/{professoresId}/solicitacoes/{solicitacoesId}')
    .onCreate(event => {
        console.log(JSON.stringify(event.data()));
                    const msg = {
                        to: event.data().profTo.email,
                        from: 'michael.tinelli@soulasalle.com.br',
                        subject:  'Easy Learning Nova Solicitação',
                        
                        templateId: '47c1a5ef-45ff-4826-80fc-bdd3d4adf355',
                        substitutionWrappers: ['{{', '}}'],
                        substitutions: {
                          name: event.data().profTo.nome,
                          nameReq: event.data().profOrigin.nome,
                          telReq: event.data().profOrigin.telefone,
                          emailReq: event.data().profOrigin.email,
                          dataReq: new Date
                          
                        }
                    };

                    sgMail.send(msg)
              
      return Promise.resolve();               

});



exports.firestoreAlternativeEmail = functions.firestore
    .document('professores/{professoresId}/solicitacoes/{solicitacoesId}')
    .onCreate(event => {
       console.log(event.params.solicitacoesId);
        const userOr = event.data().profOrigin;
        const userTo = event.data().profTo;

        const db = admin.firestore();

        return db.collection('professores').doc(userTo.id)
                 .get()
                 .then(doc => {

                    const prof = doc.data();

                    const msg = {
                        to: prof.email,
                        from: 'michael.tinelli@soulasalle.com.br',
                        subject:  'Easy Learning Nova Solicitação',
                        
                        templateId: '47c1a5ef-45ff-4826-80fc-bdd3d4adf355',
                        substitutionWrappers: ['{{', '}}'],
                        substitutions: {
                          name: prof.nome,
                          nameReq: event.data().profOrigin.nome,
                          telReq: event.data().profOrigin.telefone,
                          emailReq: event.data().profOrigin.email,
                          dataReq: new Date
                          
                        }
                    };

                    return sgMail.send(msg)
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err) )
                     
});


exports.httpEmail = functions.https.onRequest((req, res) => {

    cors( req, res, () => { 

        const toName  = req.body.toName;
        const toEmail = req.body.toEmail;
        const orName = req.body.orName;
        const orEmail = req.body.orEmail;
        const orTel = req.body.orTel;

        const msg = {
            to: toEmail,
            from: 'michael.tinelli@soulasalle.com.br',
            subject:  'Easy Learning Nova Solicitação',
            
            templateId: '47c1a5ef-45ff-4826-80fc-bdd3d4adf355',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
              name: toName,
              nameReq: orName,
              telReq: orTel,
              emailReq: orEmail,
              dataReq: new Date().getDate()
              
            }
        };

        return sgMail.send(msg)
                
            .then(() => res.status(200).send('email sent!') )
            .catch(err => res.status(400).send(err) )

        });

});
*/

exports.firestoreTwoAlternativeEmail = functions.firestore
    .document(`professores/{professoresId}/solicitacoes/{solicitacoesId}`)
    .onCreate(event => {
       //console.log(event.params.solicitacoesId);
        
        const userTo = event.data().prof;

        const db = admin.firestore();

        return db.collection('professores').doc(userTo.id)
                 .get()
                 .then(doc => {

                    const prof = doc.data();

                    const msg = {
                        to: prof.email,
                        from: 'michael.tinelli@soulasalle.com.br',
                        subject:  'Easy Learning Nova Solicitação',
                        
                        templateId: 'c4bd72ce-6d74-4e76-a412-515ae3050e53',
                        substitutionWrappers: ['{{', '}}'],
                        substitutions: {
                          name: prof.nome,
                          nameReq: event.data().req.nome,
                          telReq: event.data().req.telefone,
                          emailReq: event.data().req.email,
                          dataReq: new Date
                          
                        }
                    };

                    return sgMail.send(msg, (error, result) => {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log(result);
                        }
                    })
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err) )
                     
});