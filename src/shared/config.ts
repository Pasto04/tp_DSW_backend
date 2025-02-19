export const {
  PORT = 3000,
  SALT_ROUNDS = 10,
  SECRET_JWT_KEY = '@$@this_|_is@$@|@$@my_|_powerfull@$@|@$@secret_|_key@$@|@$@363_|_456@$@|@$@****_|_{}[]@$|$@^^^^',
  ACCEPTED_ORIGINS = [
    'http://localhost:4200',
    'http://localhost:9876'
  ]
} = process.env