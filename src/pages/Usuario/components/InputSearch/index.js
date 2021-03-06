import {
    Wrapper,
    Input,
    WrapperIcon,
} from './style.js';
import { useState, useContext } from 'react';
import { Search } from 'react-feather';
import axios from '../../../../services';
import { Contextusuarios } from '../../../../context/Usuario';

export default function InputComponent({ name, type }) {
    const [campo, setCampo] = useState('');
    const { setDataUsuarios } = useContext(Contextusuarios);

    async function handlePesquisa(event) {
        const { value } = event.target;
        setCampo(value);
    }
    async function getDataUsuariosByName(){
        await axios.get(`usuariospesquisa/${campo}`)
            .then(result => {
                const { data } = result;
                return setDataUsuarios(data);
        });
    }
    return (
        <Wrapper>
            <Input type={type} id={name} name={name} value={campo}  onChange={(event) => handlePesquisa(event)} placeholder="Pesquisar" />
            <WrapperIcon onClick={(event) => getDataUsuariosByName(event)}>
                <Search color="#000" />
            </WrapperIcon>
        </Wrapper>
    );
}