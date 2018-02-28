package de.fau.rehau.industrie40.demo.api;

import javax.ws.rs.core.MediaType;
import javax.naming.directory.InvalidAttributesException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import de.fau.rehau.industrie40.businesslayer.FauRehauContext;
import de.fau.rehau.industrie40.demo.api.entities.ConsumerGamestateDto;
import de.fau.rehau.industrie40.demo.api.entities.ProducerGamestateDto;
import de.fau.rehau.industrie40.demo.businesslayer.entities.*;
import de.fau.rehau.industrie40.demo.businesslayer.entities.orders.FauRehauOrder;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauConsumer;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauProducer;
import de.fau.rehau.industrie40.demo.businesslayer.entities.user.FauRehauUser;
import de.fau.rehau.industrie40.demo.exceptions.NotEnoughRessourcesException;

@Path("test")
public class Api_impl {

	@GET
	@Path("rest-test")
	public Response restTest() {
		return Response.ok("api is working as intended").build();
	}

	@GET
	@Path("/has-game-started")
	public Response hasGameStarted() {
		return Response.ok().entity(FauRehauContext.hasGameStarted()).build();
	}

	@GET
	@Path("/start-game")
	public Response startGame(@QueryParam("time") float time) {
		if(FauRehauContext.hasGameStarted() == false)  {
			FauRehauContext.startGame(time);
		}
		return Response.ok("game started!").build();
	}
	
	@GET
	@Path("/stop-game")
	public Response stopGame() {
		if(FauRehauContext.hasGameStarted() == true) {
			FauRehauContext.stopGame();
			FauRehauContext.reset();
		}
		return Response.ok("game-stopped").build();
	}
	
	@GET
	@Path("/producer/set-machine/machine-id/{id}")
	@Produces("application/json")
	public Response setActiveMachine(@PathParam("id") int machineId, @HeaderParam("GroupId") int groupId, @HeaderParam("UserId") int userId) {
		FauRehauGroup frGroup = FauRehauContext.getGroupById(groupId);
		
		if(frGroup == null)
			return Response.status(Status.FORBIDDEN).build();
		
		FauRehauProducer frProducer = (FauRehauProducer)frGroup.getUserById(userId);
		
		if(frProducer == null)
			return Response.status(Status.FORBIDDEN).build();
		
		frProducer.setActiveMachine(machineId);
		
		try {
			return Response.ok().entity(frGroup.buildProducerGamestate(userId)).build();
		} catch (InvalidAttributesException e) {
			return Response.status(403).build();
		}
	}

	@GET
	@Path("/{role}/register-new/username/{param}")
	public Response registerNew(@PathParam("role") String role, @PathParam("param") String userName, @HeaderParam("GroupId") int groupId) {
		FauRehauUser frUser = null;
		
		try {
			frUser = FauRehauContext.getGroupById(groupId).addUser(role, userName);
		} catch (InvalidAttributesException e) {
			return Response.ok(e.getMessage()).build();
		}
		Response responseToReturn = null;

		if(frUser != null) {
			responseToReturn = Response.ok().entity(frUser.getId()).build();
		} else {
			responseToReturn = Response.status(Status.CONFLICT).build();
		}
	
		return responseToReturn;
	}

	@GET
	@Path("/group/get-all")
	public Response getAllGroups() {
		return Response.ok().entity(FauRehauContext.getAllGroups()).build();
	}
	
	@GET
	@Path("/consumer/submit-order/qr-code/{param}/{ammount}")
	@Produces("application/json")
	public Response addProduct(@PathParam("param") String qrCode, @PathParam("ammount") int ammount, @HeaderParam("GroupId") int groupId, @HeaderParam("UserId") int userId) {
		
		FauRehauGroup group = FauRehauContext.getGroupById(groupId);
		
		Response responseToReturn = null;
		
		if(group == null)
			responseToReturn = Response.serverError().build();
		else {
			try {
				group.addOrder((FauRehauConsumer) group.getUserById(userId), qrCode, ammount);
				responseToReturn = Response.ok().entity(group.buildConsumerGamestate(userId)).build();
			} catch (NotEnoughRessourcesException e) {
				responseToReturn = Response.status(Status.PRECONDITION_FAILED).build();
			} catch (InvalidAttributesException e) {
				responseToReturn = Response.status(403).build();
			} 
		}
		
		return responseToReturn;
	}

	@GET
	@Path("/producer/repair-machine/machine-id/{id}")
	@Produces("application/json")
	public Response repairMachine(@HeaderParam("GroupId") int groupId, @HeaderParam("UserId") int userId, @PathParam("id") int id) {
		FauRehauGroup frGroup = FauRehauContext.getGroupById(groupId);
		
		if(frGroup == null) {
			return Response.status(403).build();
		}

		FauRehauProducer frProducer = (FauRehauProducer)frGroup.getUserById(userId);
		
		if(frProducer == null) {
			return Response.status(403).build();
		}
	
		int cost = frProducer.getFrMachines()[id].getRepairCost();
		
		if(frGroup.canAffordTransaction(frProducer, cost)) {
			frGroup.makeTransaction(frProducer, cost);
			frProducer.getFrMachines()[id].repair();
			try {
				return Response.ok().entity(frGroup.buildProducerGamestate(userId)).build();
			} catch (InvalidAttributesException e) {
				return Response.status(403).build();
			}
		} else {
			return Response.status(Status.PRECONDITION_FAILED).build();
		}
	}
	
	@GET
	@Path("/consumer/complete-quest")
	@Produces("application/json")
	public Response completeQuest(@HeaderParam("GroupId") int groupId, @HeaderParam("UserId") int userId, @HeaderParam("QuestId") int questId) {
		FauRehauGroup group = FauRehauContext.getGroupById(groupId);
		
		if(group == null) {
			return Response.status(403).build();
		}

		try {
			group.completeQuest(userId, questId);
		} catch (NotEnoughRessourcesException e) {
			return Response.status(Status.PRECONDITION_FAILED).build();
		}
		
		try {
			return Response.ok()
					.entity(group.buildConsumerGamestate(userId))
					.build();
		} catch (InvalidAttributesException e) {
			return Response.ok()
					.status(403)
					.build();
		}
	}

	@GET
	@Path("/producer/approve-order")
	@Produces("application/json")
	public Response approveOrder(@HeaderParam("GroupId") int groupId, @HeaderParam ("UserId") int userId, @HeaderParam("OrderId") int orderId) {
		
		FauRehauGroup group = FauRehauContext.getGroupById(groupId);
		
		if(group == null)
			return Response.status(403).build();

		FauRehauOrder order = group.getOrderById(orderId);
		
		if(order == null)
			return Response.status(403).build();
		
		FauRehauProducer producer = (FauRehauProducer)group.getUserById(userId);
		
		if(producer == null)
			return Response.status(403).build();

		FauRehauMachine frMachine = producer.getCurrentMachine();
		
		if(frMachine == null)
			return Response.serverError().build();
		
		if(!frMachine.isFree())
			return Response.status(Response.Status.REQUEST_ENTITY_TOO_LARGE).build();
		
		frMachine.setCurrentOrder(order);
		
		try {
			return Response.ok()
					.entity(group.buildProducerGamestate(userId))
					.build();
		} catch (InvalidAttributesException e) {
			return Response.status(403).build();
		}
	}
	//pw:Zvq8hhByvVTs3zP
	@GET
	@Path("/group/register-new-group/qr-code/{param}")
	public Response addGroup(@PathParam("param") String qrCode) {
		return Response.ok()
				.entity(FauRehauContext.createGroupOrReturn(qrCode).getGroupId()).build();
	}

	@GET
	@Path("/add-quest/{name}/{a}/{b}/{c}/{points}")
	public Response addGroup(@HeaderParam("GroupId") int groupId, @PathParam("name") String name, @PathParam("a") int a, @PathParam("b") int b, @PathParam("c") int c, @PathParam("points") int points) {
		FauRehauContext.addQuest(a, b, c, points, name);
		return Response.ok().build();
	}


	@POST
	@Path("/push-question")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response pushQuestion(String question) {
		FauRehauContext.addQuestion(question);
		return Response.ok().build();
	}

	@GET
	@Path("/answer-question")
	public Response answerQuestion(@HeaderParam("UserId") int userId, @HeaderParam("GroupId") int groupId, @HeaderParam("Points") int points) {
		FauRehauContext.setQuestionAnswered(groupId, userId, points);
		return Response.ok().build();
	}

	@GET
	@Path("/consumer/get-products")
	@Produces("application/json")
	public Response getProducts(@HeaderParam("UserId") int userId, @HeaderParam("GroupId") int groupId) {
		FauRehauGroup frGroup = FauRehauContext.getGroupById(groupId);
		
		if(frGroup == null) {
			return Response.status(403).build();
		}
		
		return Response.ok().entity(frGroup.getOrdersByUserId(userId)).build();
	}

	@GET
	@Path("/{state-type}/get-gamestate")
	@Produces("application/json")
	public Response getGameState(@PathParam("state-type") String stateType, @HeaderParam("UserId") int userId, @HeaderParam("GroupId") int groupId) {
		Response responseToReturn = null;
		
		FauRehauGroup group = FauRehauContext.getGroupById(groupId);
		
		if (group == null) {
			System.out.println("no group");
			responseToReturn = Response.status(403).build();
		} else {
			if (stateType.equals("producer")) {
				ProducerGamestateDto gamestate = null;
				try {
					gamestate = group.buildProducerGamestate(userId);
				} catch (InvalidAttributesException e) {
					return Response.status(403).build();
				}				
				responseToReturn = Response.ok().entity(gamestate).build();
			} else if (stateType.equals("consumer")) {
				ConsumerGamestateDto gamestate = null;
				try {
					gamestate = group.buildConsumerGamestate(userId);
				} catch (InvalidAttributesException e) {
					return Response.status(403).build();
				}
				responseToReturn = Response.ok().entity(gamestate).build();
			} else {
				responseToReturn = Response.status(Status.BAD_REQUEST).build();
			}
		}
		
		return responseToReturn;
	}
}