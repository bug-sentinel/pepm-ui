/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateComputeCaseCommandForm } from '../models/CreateComputeCaseCommandForm';
import type { CreateComputeCaseCommandResponse } from '../models/CreateComputeCaseCommandResponse';
import type { ListComputeCasesByAnalogueModelIdQueryResponse } from '../models/ListComputeCasesByAnalogueModelIdQueryResponse';
import type { UpdateComputeCaseCommandForm } from '../models/UpdateComputeCaseCommandForm';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalogueModelComputeCasesService {

    /**
     * @param id
     * @param requestBody
     * @returns CreateComputeCaseCommandResponse Success
     * @throws ApiError
     */
    public static postApiAnalogueModelsComputeCases(
        id: string,
        requestBody?: CreateComputeCaseCommandForm,
    ): CancelablePromise<CreateComputeCaseCommandResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analogue-models/{id}/compute-cases',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param id
     * @returns ListComputeCasesByAnalogueModelIdQueryResponse Success
     * @throws ApiError
     */
    public static getApiAnalogueModelsComputeCases(
        id: string,
    ): CancelablePromise<ListComputeCasesByAnalogueModelIdQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analogue-models/{id}/compute-cases',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param computeCaseId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static putApiAnalogueModelsComputeCases(
        id: string,
        computeCaseId: string,
        requestBody?: UpdateComputeCaseCommandForm,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/analogue-models/{id}/compute-cases/{computeCaseId}',
            path: {
                'id': id,
                'computeCaseId': computeCaseId,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}
