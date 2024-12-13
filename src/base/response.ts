import { stringifyWithBigInt } from '../../helpers/objectHelpers.ts'; 

export interface ResponsePaginate {
    form: number;
    size: number;
    total: number;
}

export interface BaseResponse<T> {
    status: number;
    message: string;
    data?: T | { success: true; paginate?: ResponsePaginate }; // Make data optional and allow success object
    paginate?: ResponsePaginate;
}

// Function for creating response JSON
export const defaultJSON = <T>(status: number, message: string, data?: T, paginate?: ResponsePaginate) => {
    const response: BaseResponse<T> = {
        status,
        message,
        data: status === 200 ? { success: true, paginate } : undefined, 
        paginate,
  
    };

    if (data && status === 200 ) {
        response.message = message;
        response.data = JSON.parse(stringifyWithBigInt(data)); 
    }



    if ( !data &&status !== 200) {
        response.message = message;
        response.data = data; 
    }

    return new Response(JSON.stringify(response), {
        status: status,
        headers: { 'Content-Type': 'application/json' },
    });

};

// Success 200 success
export const Success = <T>(data: T, paginate?: ResponsePaginate) => {
    return defaultJSON(200, 'Success', data, paginate);
};

// Paginate 200 success (supports pagination)
export const Paginate = <T>(data: T, form: number, size: number, total: number) => {
    if (total === 0) {
        return defaultJSON(200, 'Success', [], undefined);
    } else {
        return defaultJSON(200, 'Success', data, {
            form: form,
            size: size,
            total: total,
        });
    }
};

// BadRequest 400 other and external error
export const BadRequest = (message: string, data: any) => {
    return defaultJSON(400, message);
};

// Unauthorized 401 unauthorized
export const Unauthorized = (message: string, data: any) => {
    return defaultJSON(401, message);
};

// Forbidden 403 No permission
export const Forbidden = (message: string, data: any) => {
    return defaultJSON(403, message);
};

// ValidateFailed 412 Validation error
export const ValidateFailed = (message: string, data: any) => {
    return defaultJSON(412, message);
};

// InternalServerError 500 internal error
export const InternalServerError = (message: string, data: any) => {
    return defaultJSON(500, message);
};

// NotImplemented 501 not implemented
export const NotImplemented = (message: string, data: any) => {
    return defaultJSON(501, message);
};
