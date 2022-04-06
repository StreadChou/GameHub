import {EventEmitter} from "events";

import {getLogger} from 'pinus-logger';

let logger = getLogger('pinus', __filename);

// 状态函数定义，可以将到的状态定义成函数体
type EGoToStateFunc<State> = (from: State) => State;
type EToState<State> = State | EGoToStateFunc<State>;

/**********************************
 * 状态转换描述接口
 * from - 来源状态，可能是从任意状态跳转过来的
 * to - 跳转的目标状态
 * time - 状态持续时间
 * onTransition - 跳转触发的状态转换函数(可以不用)
 * ***********************/
export interface ITransitionDir<State> {
    from: State | State[] | '*';
    to: EToState<State>;
    onTransition?: (from: State, to: State) => void;
}


type ITransitions<T, State> = {
    [P in keyof T]: ITransitionDir<State> | ITransitionDir<State>[];
}

type TransitionCall<T, State> = {
    [P in keyof T]: (toState?: State) => void;
};

export interface STOptions<T, State> {
    init: State;
    transitions: ITransitions<T, State>;
}

/******************************************************
 * 构建状态机转换的函数
 *******************************************************/
export function BuildTransition<State>(from: State | State[] | '*', to: EToState<State>, onTransition?: (from: State, to: State) => void): ITransitionDir<State> {
    return {from, to, onTransition};
}

export class StateMachine<T, State> extends EventEmitter {
    // 状态跳转
    private _transitions: TransitionCall<T, State>;
    // 当前状态
    private _curState: State;
    // 传入的原生状态跳转结构
    private _originTransitions: ITransitions<T, State>;
    // 当前是否在状态转换中
    private _isTransiting = false;

    onBefore?: (from: State, to: State) => void
    onAfter?: (from: State, to: State) => void

    constructor(option: STOptions<T, State>) {
        super();
        const {init, transitions} = option;

        this._curState = init;

        this.setupTransitions(transitions);
    }

    // 设置状态转换
    private setupTransitions(transitions: ITransitions<T, State>) {
        this._originTransitions = transitions;
        this._transitions = {} as any;

        Object.keys(transitions).forEach(k => {
            const key = k as keyof T;

            const value: ITransitionDir<State> | ITransitionDir<State>[] = transitions[key];

            this._transitions[key] = ((state) => {
                if (!this.can(key)) {
                    logger.error(`1000 not doing '${key}' 当前的状态是 ${this._curState}`);
                    return false;
                }

                if (this._isTransiting) {
                    logger.error(`1001 当前正在状态转换中...`)
                    return false;
                }

                const curState = this._curState;
                const dir = this._findStateDir(curState, value);

                if (dir == null) {
                    logger.error(`1002 现在不能 '${key}' 行为. 当前的状态是 ${this._curState}`);
                    return false;
                }

                const {to, onTransition} = dir;
                const toState = ((typeof to === 'function') ? ((to as EGoToStateFunc<State>)(state)) : to);

                this._isTransiting = true;
                this.onBefore && this.onBefore(curState, toState);
                onTransition && onTransition(curState, toState);
                this._curState = toState;
                this.onAfter && this.onAfter(curState, toState);
                this._isTransiting = false;
                return true;
            });
        });
    }

    transition() {
        return this._transitions;
    }

    // 获取当前状态
    state() {
        return this._curState;
    }

    // 是否当前状态
    public is(state: State) {
        return this._curState == state;
    }

    /**
     * 是否能转换状态
     * @param t
     */
    public can(t: keyof T) {
        const value: ITransitionDir<State> | ITransitionDir<State>[] = this._originTransitions[t];
        if (!value) {
            return false;
        }

        const dir = this._findStateDir(this._curState, value);
        return dir != null;
    }

    private _findStateDir(from: State, dirs: ITransitionDir<State> | ITransitionDir<State>[]) {
        if (Array.isArray(dirs)) {
            return this._findDirOfArray(from, dirs);
        }

        if (this._isIncludeState(dirs.from, from)) {
            return dirs;
        }

        return null;
    }

    private _findDirOfArray(from: State, dirs: (ITransitionDir<State>)[]) {
        for (const index in dirs) {
            const dir = dirs[index];
            if (this._isIncludeState(dir.from, from)) {
                return dir;
            }
        }

        return null;
    }

    private _isIncludeState(state: State | State[] | '*', targetState: State) {
        if (state === '*') {
            return true;
        }

        if (targetState === state) {
            return true;
        }

        if (Array.isArray(state) && (state.indexOf(targetState) != -1)) {
            return true;
        }

        //

        return false;
    }
}
