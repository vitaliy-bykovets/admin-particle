const usersSeed = [
    {
        id: 1,
        first_name: 'John',
        last_name: 'Smith',
        email: 'admin@mail.com',
        password: '$2a$08$Y.5Vg0/2NTv0R8ScWvpuJ.tTThfWPJT7BtTtyWL4giEzMClNRpvWy',
        roles: 'admin',
        avatar: null,
        created_at: new Date()
    },
];

exports.seed = async knex => {
  // await knex('users').del();
  await knex('users').insert(usersSeed);
};
