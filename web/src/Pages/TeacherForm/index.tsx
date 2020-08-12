import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../Components/PageHeader'
import Input from '../../Components/Input'
import Textarea from '../../Components/Textarea'
import Select from '../../Components/Select'

import warningIcon from '../../Assets/images/icons/warning.svg'

import './style.css'
import api from '../../Services/API'

function TeacherForm() {
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ])

    const history = useHistory()

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
        scheduleItems.push()
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso')
            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro')
        })

        console.log({

        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title='Que incrivel que você quer dar aulas'
                description='O Primeiro passo é preencher esse formulario de inscrição'
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input name='name' label='Nome completo' value={name} onChange={e => setName(e.target.value)} />
                        <Input name='avatar' label='Avatar' value={avatar} onChange={e => setAvatar(e.target.value)} />
                        <Input name='whatsapp' label='Whatsapp' value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                        <Textarea name='bio' label='Biografia' value={bio} onChange={e => setBio(e.target.value)} />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name='subject'
                            label='Máteria'
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Artes' },
                                { value: 'Historia', label: 'Historia' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Quimica', label: 'Quimica' },
                                { value: 'Sociologia', label: 'Sociologia' },
                                { value: 'Filosofia', label: 'Filosofia' },
                            ]}
                        />
                        <Input name='cost' label='Custo da sua hora por aula' value={cost} onChange={e => setCost(e.target.value)} />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponiveis
                        <button type='button' onClick={addNewScheduleItem}>+ Novo Horário</button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name='week_day'
                                        label='Dia da semana'
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-Feira' },
                                            { value: '2', label: 'Terça-Feira' },
                                            { value: '3', label: 'Quarta-Feira' },
                                            { value: '4', label: 'Quinta-Feira' },
                                            { value: '5', label: 'Sexta-Feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />

                                    <Input name='from' label='Das' type='time' value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                                    <Input name='to' label='Até' type='time' value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                        Importante <br />
                        Preencha todos os campos
                    </p>

                        <button type='submit'>
                            Salvar Cadastro
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm