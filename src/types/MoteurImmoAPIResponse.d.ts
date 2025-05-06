import MoteurImmoAd from "./MoteurImmoAd";

export default interface MoteurImmoAPIResponse {
    count: number
    ads: MoteurImmoAd[],
    error?: string
}

