import {appSlice, initialState, setAppStatusAC} from 'app/appSlice'
import {appActions} from "app/index";

let startState: typeof initialState;

beforeEach(() => {
	startState = {
		error: null,
		status: 'idle',
		isInitialized: false
	}
})

test('correct error message should be set', () => {
	const endState
		= appSlice(startState, appActions.setAppErrorAC({error:'some error'}))
	expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {
	const endState
		= appSlice(startState, setAppStatusAC({status:'loading'}))
	expect(endState.status).toBe('loading');
})

