#!/usr/bin/env node
import {Server} from '@modelcontextprotocol/sdk/server/index.js';
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js';
import {CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError,} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import MoteurImmoPortals from "./constants/MoteurImmoPortals";
import MoteurImmoSorts from "./constants/MoteurImmoSorts";
import MoteurImmoCategories from "./constants/MoteurImmoCategories";
import MoteurImmoOptions from "./constants/MoteurImmoOptions";
import MoteurImmoAPIResponse from "./types/MoteurImmoAPIResponse";

class MoteurImmoServer {
    private server: Server;
    private axiosInstance;

    constructor() {
        console.error('[Setup] Initializing MoteurImmo server...');

        if (!process.env.MOTEUR_IMMO_API_KEY) {
            console.error('[Warning] MOTEUR_IMMO_API_KEY environment variable is not set');
        }

        console.error('[Setup] Initializing MoteurImmo server...');

        this.server = new Server(
            {
                name: 'moteurimmo-mcp-server',
                version: '0.1.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        this.axiosInstance = axios.create({
            baseURL: 'https://moteurimmo.fr/api',
            timeout: 5000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.setupToolHandlers();

        this.server.onerror = (error) => console.error('[Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    private setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'search_ads',
                    description: 'Search for real estate ads on MoteurImmo',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            origins: {
                                type: "array",
                                items: {
                                    enum: MoteurImmoPortals,
                                },
                                default: MoteurImmoPortals,
                                description: 'List of real estate platform names to include in the search',
                            },
                            sortBy: {
                                type: 'string',
                                items: {
                                    enum: MoteurImmoSorts
                                },
                                default: 'lastEventDate-desc',
                                description: 'Sort by field (e.g. date, creationDate, price, etc.)',
                            },
                            creationDateBefore: {
                                type: 'string',
                                description: 'Creation date before ISO6010 date',
                            },
                            creationDateAfter: {
                                type: 'string',
                                description: 'Creation date after ISO6010 date',
                            },
                            deletionDateBefore: {
                                type: 'string',
                                description: 'Deletion date before ISO6010 date',
                            },
                            deletionDateAfter: {
                                type: 'string',
                                description: 'Deletion date before ISO6010 date',
                            },
                            lastPriceChangeDateBefore: {
                                type: 'string',
                                description: 'Last price change date before ISO6010 date',
                            },
                            lastPriceChangeDateAfter: {
                                type: 'string',
                                description: 'Last price change date after ISO6010 date',
                            },
                            lastPublicationDateBefore: {
                                type: 'string',
                                description: 'Last publication date before ISO6010 date',
                            },
                            lastPublicationDateAfter: {
                                type: 'string',
                                description: 'Last publication date after ISO6010 date',
                            },
                            lastEventDateBefore: {
                                type: 'string',
                                description: 'Last event date before ISO6010 date',
                            },
                            lastEventDateAfter: {
                                type: 'string',
                                description: 'Last event date after ISO6010 date',
                            },
                            lastChangeDateBefore: {
                                type: 'string',
                                description: 'Last change date before ISO6010 date',
                            },
                            lastChangeDateAfter: {
                                type: 'string',
                                description: 'Last change date after ISO6010 date',
                            },
                            lastMergeDateBefore: {
                                type: 'string',
                                description: 'Last merge date before ISO6010 date',
                            },
                            lastMergeDateAfter: {
                                type: 'string',
                                description: 'Last merge date after ISO6010 date',
                            },
                            types: {
                                type: 'array',
                                items: {
                                    enum: ['sale', 'rental']
                                },
                                default: ['sale', 'rental'],
                                description: 'Sales or rentals type',
                            },
                            categories: {
                                type: 'array',
                                items: {
                                    enum: MoteurImmoCategories
                                },
                                default: MoteurImmoCategories,
                                description: 'Property categories',
                            },
                            publisherTypes: {
                                type: 'array',
                                items: {
                                    enum: ['professional', 'individual']
                                },
                                default: ['professional', 'individual'],
                                description: 'List of advertiser types',
                            },
                            location: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        inseeCode: { type: 'string', description: 'INSEE Code of the City' },
                                    },
                                    required: ['inseeCode']
                                },
                                description: 'List of search zones'
                            },
                            radius: {
                                type: 'number',
                                description: 'Search radius in km',
                            },
                            priceMin: {
                                type: 'number',
                                description: 'Minimum price',
                            },
                            priceMax: {
                                type: 'number',
                                description: 'Maximum price',
                            },
                            pricePerSquareMeterMin: {
                                type: 'number',
                                description: 'Minimum price per square meter',
                            },
                            pricePerSquareMeterMax: {
                                type: 'number',
                                description: 'Maximum price per square meter',
                            },
                            rentMin: {
                                type: 'number',
                                description: 'Minimum rent',
                            },
                            rentMax: {
                                type: 'number',
                                description: 'Maximum rent',
                            },
                            propertyChargesMin: {
                                type: 'number',
                                description: 'Minimum property charges',
                            },
                            propertyChargesMax: {
                                type: 'number',
                                description: 'Maximum property charges',
                            },
                            propertyTaxMin: {
                                type: 'number',
                                description: 'Minimum property tax',
                            },
                            propertyTaxMax: {
                                type: 'number',
                                description: 'Maximum property tax',
                            },
                            roomsMin: {
                                type: 'number',
                                description: 'Minimum number of rooms',
                            },
                            roomsMax: {
                                type: 'number',
                                description: 'Maximum number of rooms',
                            },
                            bedroomsMin: {
                                type: 'number',
                                description: 'Minimum number of bedrooms',
                            },
                            bedroomsMax: {
                                type: 'number',
                                description: 'Maximum number of bedrooms',
                            },
                            surfaceMin: {
                                type: 'number',
                                description: 'Minimum surface area in m²',
                            },
                            surfaceMax: {
                                type: 'number',
                                description: 'Maximum surface area in m²',
                            },
                            landSurfaceMin: {
                                type: 'number',
                                description: 'Minimum land surface area in m²',
                            },
                            landSurfaceMax: {
                                type: 'number',
                                description: 'Maximum land surface area in m²',
                            },
                            constructionYearMin: {
                                type: 'number',
                                description: 'Minimum construction year',
                            },
                            constructionYearMax: {
                                type: 'number',
                                description: 'Maximum construction year',
                            },
                            floorMin: {
                                type: 'number',
                                description: 'Minimum floor number',
                            },
                            floorMax: {
                                type: 'number',
                                description: 'Maximum floor number',
                            },
                            buildingFloorsMin: {
                                type: 'number',
                                description: 'Minimum number of floors in the building',
                            },
                            buildingFloorsMax: {
                                type: 'number',
                                description: 'Maximum number of floors in the building',
                            },
                            energyGradeMin: {
                                type: 'string',
                                items: {
                                    enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'V']
                                },
                                description: 'DPE energy grade min (cannot be used with land category)',
                            },
                            energyGradeMax: {
                                type: 'string',
                                items: {
                                    enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'V']
                                },
                                description: 'DPE energy grade max (cannot be used with land category)',
                            },
                            gasGradeMin: {
                                type: 'string',
                                items: {
                                    enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'V']
                                },
                                description: 'Gas grade min (cannot be used with land category)',
                            },
                            gasGradeMax: {
                                type: 'string',
                                items: {
                                    enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'V']
                                },
                                description: 'Gas grade max (cannot be used with land category)',
                            },
                            options: {
                                type: 'array',
                                items: {
                                    enum: MoteurImmoOptions
                                },
                                description: 'Options for the ad',
                            },
                            keywords: {
                                type: 'array',
                                items: {
                                    type: 'string'
                                },
                                description: 'Keywords to search in the ad title and description',
                            },
                            keywordsOperator: {
                                type: 'string',
                                enum: ['and', 'or'],
                                description: 'Keyword search operator (AND or OR)',
                            },
                            includeHistory: {
                                type: 'boolean',
                                description: 'Include ad history',
                            },
                            includeNegotiationAnalysis: {
                                type: 'boolean',
                                description: 'Include negotiation analysis',
                            }
                        },
                        required: [],
                    },
                },
                {
                    name: 'get_ad',
                    description: 'Get one real estate ad by ID',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                description: 'Ad ID',
                            }
                        },
                        required: ['id'],
                    },
                },
                {
                    name: 'search_city_insee_code',
                    description: 'Search for INSEE code of a city by name',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            query: {
                                type: 'string',
                                description: 'The name of the city to search for',
                            }
                        },
                        required: ['query'],
                    },
                },
            ],
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                if (!['search_ads', 'get_ad', 'search_city_insee_code'].includes(request.params.name)) {
                    throw new McpError(
                        ErrorCode.MethodNotFound,
                        `Unknown tool: ${request.params.name}`
                    );
                }

                const args = request.params.arguments;

                if (request.params.name === 'search_ads') {
                    console.error(`[API] Fetching ads with args`);
                    const response = await this.axiosInstance.post<MoteurImmoAPIResponse>(
                        '/ads',
                        {
                            token: process.env.MOTEUR_IMMO_API_KEY,
                            ...args
                        },
                        {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            validateStatus: () => true
                        },
                    );

                    if(response.status !== 200) {
                        throw new Error(`MoteurImmo API error: ${response.data.error}`);
                    }

                    const ads = response.data.ads;
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify(
                                    ads,
                                    null,
                                    2
                                ),
                            },
                        ],
                    };
                }
                if (request.params.name === 'get_ad') {
                    // get_ad
                    console.error(`[API] Fetching ad for id: ${args?.id}`);
                    const response = await this.axiosInstance.get<MoteurImmoAPIResponse>(
                        '/ad/' + args?.id,
                        {
                            headers: {
                                apiKey: process.env.MOTEUR_IMMO_API_KEY
                            },
                            validateStatus: () => true
                        },
                    );

                    if(response.status !== 200) {
                        throw new Error(`MoteurImmo API error: ${response.statusText}`);
                    }

                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify(
                                    response.data.ads,
                                    null,
                                    2
                                ),
                            },
                        ],
                    };
                }
                if (request.params.name === 'search_city_insee_code') {
                    console.error(`[API] Searching INSEE code for city: ${args?.query}`);
                    const response = await axios.get<any>(
                        'https://api-adresse.data.gouv.fr/search/',
                        {
                            params: {
                                q: args?.query
                            },
                            headers: {
                                'Accept': 'application/json'
                            },
                            validateStatus: () => true
                        }
                    );

                    if (response.status !== 200) {
                        throw new Error(`Adresse Gouv API error: ${response.statusText}`);
                    }

                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify(
                                    response.data,
                                    null,
                                    2
                                ),
                            },
                        ],
                    };
                }

                throw new Error("[Error] Unknown tool");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('[Error] Failed to fetch data:', error);
                    throw new McpError(
                        ErrorCode.InternalError,
                        `Failed to fetch data: ${error.message}`
                    );
                }
                throw error;
            }
        });
    }

    async run() {
        try {
            const transport = new StdioServerTransport();
            await this.server.connect(transport);
            console.error('[Info] MoteurImmo MCP server running on stdio');

            process.on('uncaughtException', (error) => {
                console.error('[Fatal Error] Uncaught exception:', error);
            });
        } catch (error) {
            console.error('[Fatal Error] Failed to start server:', error);
            // Attendre avant de réessayer ou de terminer
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

const server = new MoteurImmoServer();
server.run().catch(console.error);
