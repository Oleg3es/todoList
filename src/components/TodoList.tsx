import React, { ReactElement, useState } from 'react'

interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

const TodoList = () => {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [newTodoText, setNewTodoText] = useState<string>('');
    const [filter, setFilter] = useState<FilterType>('all');

    const addNewTodo = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newTodoText.trim()) return;

        const newTodo: TodoItem = {
            id: Date.now(),
            text: newTodoText,
            completed: false
        }

        setTodoItems([...todoItems, newTodo]);
        setNewTodoText('');
    }

    const toggleTodo = (id: number) => {
        setTodoItems(todoItems.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ))
    }

    const clearCompleted = () => {
        setTodoItems(todoItems.filter(item => !item.completed));
    };

    const filteredTodos = todoItems.filter(item => {
        if (filter === 'active') return !item.completed;
        if (filter === 'completed') return item.completed;
        return true;
    });

    return (
        <div className="todos-wrapper">
            <h1 className="todos__title">
                todos
            </h1>
            <div className="todos">
                <form className="todos__input" onSubmit={addNewTodo}>
                    <span className="todos__input-arrow" />
                    <input
                        type="text"
                        value={newTodoText}
                        placeholder='Whats needs to be done'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodoText(e.target.value)}
                    />
                    <button
                        className="todos__input-btn"
                        type="submit"
                    >
                        add
                    </button>
                </form>
                <div className="todos__list">
                    <div className="todos__items">
                        {filteredTodos.map((item) => (
                            <div className="todos__item" key={item.id}>
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => toggleTodo(item.id)}
                                    className='todos__checkbox'
                                />
                                <div className="todos__item-description">
                                    {item.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="todos__interface">
                        <div className="todos__counter">
                            {todoItems.filter(item => !item.completed).length} items left
                        </div>
                        <div className="todos__filters">
                            <button
                                onClick={() => setFilter('all')}
                                className={`todos__filter-btn ${filter === 'all' ? 'active' : ''}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('active')}
                                className={`todos__filter-btn ${filter === 'active' ? 'active' : ''}`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setFilter('completed')}
                                className={`todos__filter-btn ${filter === 'completed' ? 'active' : ''}`}
                            >
                                Completed
                            </button>
                        </div>
                        <button
                            onClick={clearCompleted}
                            className="todos__clear-btn"
                        >
                            Clear completed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList