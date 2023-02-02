import { call, put } from "redux-saga/effects";

export default function* processAction(action) {
    const { params, service, success, failed, putData = false } = action;

    try {
        const payload = Array.isArray(params)
            ? yield call(service, ...params)
            : yield call(service, params);

        if (putData) {
            yield put({
                type: success,
                payload,
                data: params
            });
        } else {
            yield put({
                type: success,
                payload,
            });
        }

    } catch (error) {
        yield put({
            type: failed,
            error
        });
    }
}

export function* processCustomAction(action) {
    const { params, service, success, failed, putData = false } = action;

    try {
        const payload = Array.isArray(params)
            ? yield call(service, ...params)
            : yield call(service, params);

        if (putData) {
            yield put({
                type: success,
                payload,
                data: params
            });
        } else {
            yield put({
                type: success,
                payload,
            });
        }

    } catch (error) {
        console.log(error)
        yield put({
            type: failed,
            error
        });
    }
}
