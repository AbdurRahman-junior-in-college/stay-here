import styled from "styled-components";
// import Table from "./Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-postion: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 600;
  color: var(--color-green-600);
`;

import React from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiTrash, HiPencil, HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import { ConfirmDelete } from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menu";

const CabinRow = ({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { createCabin } = useCreateCabin();

  const { _id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  function handleDuplication() {
    createCabin({
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} gusets</div>
        <Price>{`$${regularPrice}`}</Price>
        <Discount>{`$${discount}`}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={_id} />
              <Menus.List id={_id}>
                {/* <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplication}
                >
                  Duplicate
                </Menus.Button> */}

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>

                <Modal.Open opens={"edit"}>
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={"cabins"}
                onConfirm={() => deleteCabin(_id)}
                disabled={isDeleting}
              />
            </Modal.Window>

            <Modal.Window name={"edit"}>
              <CreateCabinForm cabin={cabin} />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
