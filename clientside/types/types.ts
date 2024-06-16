import AuthDetailScreen from "../screens/AuthDetailScreen";

export type RootStackParamsList = {
    StartScreen: undefined;
    Login: undefined;
    SignUp: undefined;
    ReportProblem: undefined;
    Revision: undefined;
    ReviewProblems: undefined;
    DetailsScreen: { detailId: string };
    AuthDetailScreen: { detailId: string  };
}