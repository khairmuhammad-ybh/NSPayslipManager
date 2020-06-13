// redux
import { store } from '../redux/store';
import * as Actions from '../redux/actions';

export const resetPayslip = () => {
    return new Promise((resolve, reject) => {
        try{
            store.dispatch(Actions.reset_payslips(''))
            resolve()
        }
        catch(err) {
            reject(err)
        }
        
    })
}

export const userSignOut = () => {
    return new Promise((resolve, reject) => {
        try{
            store.dispatch(Actions.reset_payslips(''))
            store.dispatch(Actions.set_profile({name:'', rank:'', vocation:''}))
            store.dispatch(Actions.update_first_launch())
            resolve()
        }catch(err){
            reject(err)
        }
    })
}