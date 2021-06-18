/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.extend(require('dayjs/plugin/localizedFormat'));
dayjs.locale('ko');

AppRegistry.registerComponent(appName, () => App);
