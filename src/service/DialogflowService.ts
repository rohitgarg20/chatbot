import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../../env';

export const setupInitConfig = () => {
  Dialogflow_V2.setConfiguration(
    dialogflowConfig.client_email,
    dialogflowConfig.private_key,
    Dialogflow_V2.LANG_ENGLISH_US,
    dialogflowConfig.project_id
  );
}