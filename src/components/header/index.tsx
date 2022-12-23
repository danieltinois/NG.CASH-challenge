import React, { useState, useEffect, FormEvent } from "react";
import { ExtratoModel } from "../models/extratoModel";
import styles from "./header.module.scss";
import { FaEyeSlash, FaEye, FaSearch } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import DataTable from "react-data-table-component";
import moment from "moment";
import Swal from "sweetalert2";

type HeaderProps = {
  nomeUsuario: string;
};

const Header = ({ nomeUsuario }: HeaderProps) => {
  const [saldo, setSaldo] = useState<number>(1000000);
  const [listaExtrato, setListaExtrato] = useState<ExtratoModel[]>();
  const [showMoney, setShowMoney] = useState<boolean>(false);
  const [isLoadingHeader, setIsLoadingHeader] = useState<boolean>(true);
  const [nomeUsuarioLogado, setUsuarioLogado] = useState<string>(nomeUsuario);
  const [nomeUsuarioTransferencia, setNomeUsuarioTransferencia] =
    useState<string>("");
  const [valorTransferenia, setValorTransferenia] = useState<number>(0);

  let columns = [
    {
      name: "Nome Destinatário",
      selector: (row: any) => row.nomeDestinatario,
      sortable: true,
    },
    {
      name: "Valor",
      selector: (row: any) =>
        row.valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
    },
    {
      name: "Data",
      selector: (row: any) => row.data,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Linhas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const customStyle = {
    headCells: {
      style: {
        paddingLeft: "0.25rem",
        borderBottom: "0.15rem solid #000",
        fontWeight: "bold",
        fontSize: "0.95rem",
      },
    },
    cells: {
      style: {
        borderBottom: "0.15rem solid #000",
        borderRight: "0.15rem solid #c0c0c0",
        padding: "0rem 0rem 0.5rem 0.4rem",
      },
    },
  };

  const [pesquisa, setPesquisa] = useState<string>("");
  const [listaFiltrada, setListaFiltrada] = useState<ExtratoModel[]>();

  useEffect(() => {
    setListaFiltrada(listaDados);
    setPesquisa("");
  }, []);

  useEffect(() => {
    if (!isLoadingHeader) {
      return;
    }
    if (nomeUsuario === "") {
      setUsuarioLogado("Usuário de demonstração");
    }
    setListaExtrato(listaDados);
    setIsLoadingHeader(false);
  }, []);

  const handleChangePesquisa = (pesquisa: string) => {
    if (pesquisa === "") {
      setPesquisa("");
      setListaFiltrada(listaDados);
    } else {
      setPesquisa(pesquisa);
      let resultado: ExtratoModel[] = [];

      const resultadoCliente = listaDados?.filter((lista2) => {
        if (lista2.nomeDestinatario !== "") {
          return lista2.nomeDestinatario
            ?.toLowerCase()
            .match(pesquisa.toLowerCase());
        }
      });

      const resultadoDataCriacao = listaDados?.filter((lista2) => {
        if (lista2.data !== "") {
          return lista2.data?.toLowerCase().match(pesquisa.toLowerCase());
        }
      });

      if (resultadoDataCriacao?.length! > 0) {
        resultado = resultadoDataCriacao!;
      } else if (resultadoCliente?.length! > 0) {
        resultado = resultadoCliente!;
      }

      setListaFiltrada(resultado);
    }
  };

  const listaDados: ExtratoModel[] = [
    {
      nomeDestinatario: "Daniel",
      valor: 1000,
      data: "20/01/2022",
    },
    {
      nomeDestinatario: "Gustavo",
      valor: 300,
      data: "18/06/2022",
    },
    {
      nomeDestinatario: "Silvio",
      valor: 100,
      data: "30/01/2022",
    },
  ];

  const realizarTransferencia = (event: FormEvent) => {
    event.preventDefault();

    if (valorTransferenia > saldo) {
      Swal.fire("Validação", "Saldo indisponível", "warning");
      return;
    }

    if (nomeUsuarioTransferencia === "") {
      Swal.fire("Validação", "Nome para transfêrencia inválido.", "warning");
      return;
    }

    if (valorTransferenia === 0) {
      Swal.fire("Validação", "Valor para transfêrencia inválido.", "warning");
      return;
    }

    let lista = listaDados;
    let dataAtual: string = moment().format("DD/MM/YYYY");
    let modelTransferencia: ExtratoModel = {
      nomeDestinatario: nomeUsuarioTransferencia!,
      valor: Number(valorTransferenia),
      data: dataAtual,
    };

    lista.push(modelTransferencia);

    let novoSaldo = saldo - valorTransferenia;

    setListaExtrato(lista);
    setListaFiltrada(lista);
    setNomeUsuarioTransferencia("");
    setValorTransferenia(0);
    setSaldo(novoSaldo);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.texthello}>
          <span>
            <p>
              Olá,{" "}
              <span className={styles.nameclient}> {nomeUsuarioLogado} </span>,
              Bem Vindo a Sua Conta NG.CASH!
            </p>
          </span>
        </div>
        <div className={styles.balance}>
          <div className={styles.balanceStyle}>
            <div className={styles.visualizarSaldo}>
              <button
                className={styles.buttonShowMoney}
                onClick={() => setShowMoney(!showMoney)}
                type="button"
              >
                {showMoney ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
              <span className={styles.youbalance}>Saldo em conta</span>
            </div>
            <span className={styles.money}>
              {showMoney
                ? saldo.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "R$ ••••"}
            </span>
          </div>
          <div className={styles.container_form}>
            <div className={styles.main_form}>
              <form action="transferir" onSubmit={realizarTransferencia}>
                <div className="col-md-2">
                  <label htmlFor="nomeTransferencia" className="form-label">
                    <p className={styles.tittle_form}>
                      Nome para transferência:
                    </p>
                  </label>
                  <div className={styles.main_input}>
                    <input
                      autoComplete="off"
                      type="text"
                      title="Nome para transferência"
                      className="form-control"
                      name="nomeTransferencia"
                      id="nomeTransferencia"
                      value={nomeUsuarioTransferencia || ""}
                      onChange={({ target: { value } }) => {
                        setNomeUsuarioTransferencia(value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <label htmlFor="valorTransferencia" className="form-label">
                    <p className={styles.tittle_form}>
                      Valor da transferência:
                    </p>
                  </label>
                  <div className={styles.main_input}>
                    <input
                      autoComplete="off"
                      type="number"
                      title="Valor da transferência"
                      className="form-control"
                      name="valorTransferencia"
                      id="valorTransferencia"
                      value={valorTransferenia || 0}
                      onChange={({ target: { value } }) => {
                        if (Number(value) < 0) {
                          value = "";
                        }
                        setValorTransferenia(Number(value));
                      }}
                    />
                  </div>
                </div>
                <div className={styles.main_btn_login}>
                  <button className={styles.btn_login} type="submit">
                    <span className={styles.btn_login2}>Transfêrir</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.container_extrato}>
          <div className={styles.main_extrato}>
            <DataTable
              title={"Extrato"}
              columns={columns}
              data={listaFiltrada!}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="400px"
              subHeader
              subHeaderComponent={
                <>
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    className="w-25 form-control"
                    value={pesquisa}
                    onChange={(e) => handleChangePesquisa(e.target.value)}
                  />
                  <AiOutlineSearch className={styles.iconSearch} />
                </>
              }
              paginationComponentOptions={paginationComponentOptions}
              dense
              customStyles={customStyle}
              progressPending={isLoadingHeader}
              noDataComponent={"Não existem dados para visualização."}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
