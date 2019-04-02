const backupRepo = require('../index').backupRepo;

test('throws error when no request is sent', async () => {
    try {
        await backupRepo();
    } catch (e) {
        expect(e.message).toEqual('no request sent');
    }
});
