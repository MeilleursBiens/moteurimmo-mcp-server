export default interface MoteurImmoAd {
    publisher: Publisher
    reference?: string
    lastModificationDate?: string
    lastPriceChangeDate?: string
    lastPublicationDate: any
    lastChangeDate?: string
    lastMergeDate: any
    deletionDate: any
    title: string
    description: string
    pictureUrl?: string
    pictureUrls: string[]
    position?: number[]
    price?: number
    priceDrop?: number
    rent?: number
    propertyCharges?: number
    propertyTax?: number
    rooms?: number
    bedrooms?: number
    pricePerSquareMeter?: number
    surface?: number
    landSurface?: number
    constructionYear?: number
    floor?: number
    buildingFloors?: number
    options: string[]
    energyValue?: number
    energyGrade?: string
    gasValue?: number
    gasGrade?: string
    priceStats?: PriceStats
    location: Location
    origin: string
    adId: string
    publicationDate: string
    type: string
    category: string
    url: string
    creationDate: string
    lastCheckDate: string
    lastEventDate: string
    duplicates: Duplicate[]
    uniqueId: string
    originalPrice?: number
}

interface Publisher {
    type: string
    name?: string
    email?: string
    phone?: string
    address?: string
    sirenNumber?: string
}

interface PriceStats {
    rent?: number
    profitability: any
    lowPrice?: number
    medianPrice?: number
    highPrice?: number
    priceGap?: number
    versionId?: number
}

interface Location {
    city?: string
    postalCode?: string
    district?: string
    inseeCode?: string
    departmentCode: number
    regionCode?: number
    coordinates?: number[]
    population?: number
    propertyTaxRate?: number
    isRightLocation?: boolean
}

interface Duplicate {
    origin: string
    adId: string
    url: string
    price: number
    date: string
    lastCheckDate: string
    publisher: Publisher2
}

interface Publisher2 {
    type: string
    name?: string
    email?: string
    phone?: string
    address?: string
    sirenNumber?: string
}
