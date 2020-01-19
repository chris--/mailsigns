import SignatureService from './SignatureService';

it('instantiates', () => {
    jest.mock('../persistence/firebase');
    const signatureService = new SignatureService();
    signatureService.saveSignature([]);
});
