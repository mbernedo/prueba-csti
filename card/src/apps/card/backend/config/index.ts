import 'dotenv/config';
export default class Configuration {
  static readonly PORT = process.env.PORT || 4000;
  static readonly JWT_KEY = process.env.JWT_KEY
}
