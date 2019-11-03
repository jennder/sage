import React, { useState } from "react"
import PropTypes from "prop-types"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { Button, Modal, Dropdown, Input, Delete } from "../"
import { updateMeal } from "../../state/mealPlan"
import "./style.css"
import { useDispatch } from "react-redux"

const ExpansionPanel = ({ children, title, meals, recipeOptions }) => {
  const [expanded, setExpanded] = useState(true)
  const [adding, setAdding] = useState(false)
  const [recMeal, setRecMeal] = useState(null)
  const [recServings, setRecServings] = useState(1)
  const dispatch = useDispatch()

  const expand = () => {
    setExpanded(true)
  }

  const close = () => {
    setExpanded(false)
  }

  const addMeal = () => {
    setAdding(false)
    const newMeals = meals
    newMeals.push({
      meal: recMeal,
      servings: recServings,
    })
    dispatch(updateMeal(title, newMeals))
  }

  const deleteMeal = index => {
    const clone = meals
    clone.splice(index, 1)
    dispatch(updateMeal(title, clone))
  }

  return (
    <div className="panel-container">
      <div className="panel-header">
        <div className="panel-title">{title}</div>
        {expanded ? (
          <div className="panel-icon">
            <IoIosArrowUp size={24} onClick={() => close()} />
          </div>
        ) : (
          <div className="panel-icon">
            <IoIosArrowDown size={24} onClick={() => expand()} />
          </div>
        )}
      </div>
      {expanded && (
        <div className="panel-content">
          <div className="panel-meals">
            {meals.map((item, index) => (
              <div className="panel-meal">
                <div className="meal-name">{item.meal + ": " }</div>
                  <Input
                    className="sage-recipe-modal--number servings-input"
                    type="number"
                    size="small"
                    label="Servings: "
                    value={item.servings}
                    onChange={val => console.log(val)}
                  />
                <div className="panel-delete-meal">
                  <Delete onClick={() => deleteMeal(index)} />{" "}
                </div>
              </div>
            ))}
          </div>
          <div className="panel-add">
            <Button onClick={() => setAdding(true)}>+ Add Meal</Button>
          </div>
          {adding && (
            <Modal
              onClose={() => setAdding(false)}
              title={"Add Meal: " + title}
              isOpen={true}
            >
              <div className="panel-input">
                <Dropdown
                  placeholder="Pick recipe to add"
                  options={recipeOptions}
                  onChange={val => setRecMeal(val)}
                />
                <Input
                  className="sage-recipe-modal--servings"
                  type="number"
                  size="small"
                  label="Servings: "
                  value={1}
                  onChange={val => setRecServings(val)}
                />
                <Button onClick={() => addMeal()}>Add Meal</Button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  )
}

ExpansionPanel.propTypes = {
  /**
   * The content of the expansion panel.
   */
  children: PropTypes.node.isRequired,
  /**
   * The main label that appears on the expansion panel
   */
  title: PropTypes.string.isRequired,
  /**
   * The meals data
   */
  meals: PropTypes.node.isRequired,
  /**
   * The recipes data
   */
  recipeOptions: PropTypes.node.isRequired,
}

export default ExpansionPanel