exports.add = ({ name, email, password }) => ({
  text: `
    INSERT INTO app_user (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
  values: [ name, email, password ]
})
