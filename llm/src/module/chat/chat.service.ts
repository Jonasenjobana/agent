import { ChatOpenAI } from "@langchain/openai";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MemorySaver } from "@langchain/langgraph";
import { createAgent, HumanMessage } from "langchain";
import { SqliteSaver } from "@langchain/langgraph-checkpoint-sqlite";
@Injectable()
export class ChatService {
  constructor(private configService: ConfigService) {}
  get config() {
    return {
      baseURL: this.configService.get("LLM_BASE_URL"),
      apiKey: this.configService.get("LLM_API_KEY"),
      model: this.configService.get("LLM_MODEL"),
      dbPath: this.configService.get("DB_PATH"),
    };
  }
  checkpointer = SqliteSaver.fromConnString(this.config.dbPath);
  model = new ChatOpenAI({
    configuration: { baseURL: this.config.baseURL },
    apiKey: this.config.apiKey,
    model: this.config.model,
  });
  agent = createAgent({
    model: this.model,
    checkpointer: this.checkpointer,
  });

  async stream(message: HumanMessage) {
    const stream = await this.agent.stream(
      {
        messages: [message],
      },
      { streamMode: "messages", configurable: { thread_id: "1" } },
    );
    for await (const chunk of stream) {
    }
  }
}
