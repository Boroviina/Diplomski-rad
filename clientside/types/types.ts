import AuthDetailScreen from "../screens/AuthDetailScreen";

export type RootStackParamsList = {
    EntryScreen: undefined;
    StartScreen: undefined;
    Login: undefined;
    SignUp: undefined;
    ReportProblem: undefined;
    Revision: undefined;
    ReviewProblems: undefined;
    DetailsScreen: { detailId: string | undefined };
    AuthDetailScreen: { detailId: string | undefined };
}